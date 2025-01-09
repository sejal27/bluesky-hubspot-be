import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

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

    console.log('Full Token Response:', JSON.stringify(tokenResponse.data, null, 2));

    // Create the Bluesky handle property
    console.log("Creating Bluesky handle property...");
    await createBlueskyHandleProperty(tokenResponse.data.access_token);

    const portalId = tokenResponse.data?.portal_id || tokenResponse.data?.hub_id || '48801458';
    console.log('Portal ID:', portalId);
    console.log('Redirecting to:', `https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/${process.env.HUBSPOT_APP_ID}/app-cards`);

    res.redirect(`https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/${process.env.HUBSPOT_APP_ID}/app-cards`);
  } catch (error) {
    console.error('OAuth Error:', error);
    res.redirect('/error?message=oauth_failed');
  }
} 