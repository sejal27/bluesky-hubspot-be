import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

async function getTokenMetadata(accessToken: string) {
  try {
    const response = await axios.get(`https://api.hubapi.com/oauth/v1/access-tokens/${accessToken}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}

async function createBlueskyHandleProperty(accessToken: string) {
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
        }
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
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
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
    });

    const accessToken = tokenResponse.data.access_token;
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

    console.log('Portal ID:', portalId);
    const redirectUrl = `https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/${process.env.HUBSPOT_APP_ID}/app-cards`;
    console.log('Redirecting to:', redirectUrl);

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth Error:', error instanceof Error ? error.message : error);
    if (error instanceof AxiosError) {
      console.error('API Response:', {
        status: error.response?.status,
        data: error.response?.data
      });
    }
    res.redirect('/error?message=oauth_failed');
  }
}