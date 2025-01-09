import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import rateLimit from 'express-rate-limit';

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

async function getTokenMetadata(accessToken: string) {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new Error('Invalid access token');
  }

  try {
    const response = await axios.get(`https://api.hubapi.com/oauth/v1/access-tokens/${accessToken}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      timeout: 5000 // 5 second timeout
    });
    
    // Validate response data
    if (!response.data || !response.data.hub_id) {
      throw new Error('Invalid token metadata response');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}

async function createBlueskyHandleProperty(accessToken: string) {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new Error('Invalid access token');
  }

  try {
    console.log("Starting to create Bluesky handle property...");
    const response = await axios.post(
      'https://api.hubapi.com/crm/v3/properties/contacts',
      {
        name: 'bluesky_handle',
        label: 'Bluesky Handle',
        type: 'string',
        groupName: 'socialmediainformation',
        fieldType: 'text',
        formField: true,
        description: 'Bluesky social network handle'
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      }
    );
    console.log("Property created successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        console.log("Property already exists - 409 status received");
        return null;
      }
      console.error("HubSpot API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Apply rate limiting
  await new Promise((resolve) => limiter(req, res, resolve));

  const { code } = req.query;

  // Validate code
  if (!code || typeof code !== 'string' || code.length > 500) {
    return res.status(400).json({ error: 'Invalid authorization code' });
  }

  // Validate environment variables
  if (!process.env.HUBSPOT_CLIENT_ID || 
      !process.env.HUBSPOT_CLIENT_SECRET || 
      !process.env.HUBSPOT_REDIRECT_URI ||
      !process.env.HUBSPOT_APP_ID) {
    console.error('Missing required environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    console.log('Exchanging code for token...');
    const tokenResponse = await axios.post('https://api.hubapi.com/oauth/v1/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.HUBSPOT_REDIRECT_URI,
        code: code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 5000 // 5 second timeout
    });

    const accessToken = tokenResponse.data.access_token;
    
    // Validate access token
    if (!accessToken || typeof accessToken !== 'string') {
      throw new Error('Invalid access token received');
    }

    console.log('Access token received');

    // Get token metadata to get hub_id
    const tokenMetadata = await getTokenMetadata(accessToken);
    const portalId = tokenMetadata.hub_id;

    // Create the Bluesky handle property
    console.log("Creating Bluesky handle property...");
    await createBlueskyHandleProperty(accessToken);

    if (!portalId) {
      console.error('No portal ID found in token metadata:', tokenMetadata);
      throw new Error('No portal ID found in token metadata');
    }

    // Validate portal ID
    if (typeof portalId !== 'number' && typeof portalId !== 'string') {
      throw new Error('Invalid portal ID format');
    }

    console.log('Portal ID:', portalId);
    const redirectUrl = `https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/${process.env.HUBSPOT_APP_ID}/app-cards`;
    console.log('Redirecting to:', redirectUrl);

    // Use 302 Found for redirects instead of 301 to prevent caching
    res.redirect(302, redirectUrl);
  } catch (error) {
    console.error('OAuth Error:', error instanceof Error ? error.message : error);
    if (error instanceof AxiosError) {
      console.error('API Response:', {
        status: error.response?.status,
        data: error.response?.data
      });
    }
    // Don't expose error details to the client
    res.redirect(302, '/error?message=oauth_failed');
  }
}