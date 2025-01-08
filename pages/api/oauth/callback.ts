import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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

    const portalId = tokenResponse.data?.portal_id || tokenResponse.data?.hub_id || '48801458';
    console.log('Portal ID:', portalId);
    console.log('Redirecting to:', `https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/6524513/app-cards`);

    res.redirect(`https://app.hubspot.com/integrations-settings/${portalId}/installed/framework/6524513/app-cards`);
  } catch (error) {
    console.error('OAuth Error:', error);
    res.redirect('/error?message=oauth_failed');
  }
} 