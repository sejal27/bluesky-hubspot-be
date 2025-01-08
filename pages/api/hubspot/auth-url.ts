import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formattedScope = process.env.HUBSPOT_SCOPE!.replace(/,/g, ' ');
  
  const params = new URLSearchParams({
    client_id: process.env.HUBSPOT_CLIENT_ID!,
    redirect_uri: process.env.HUBSPOT_REDIRECT_URI!,
    scope: formattedScope,
  });

  const authUrl = `https://app.hubspot.com/oauth/authorize?${params.toString()}`;
  res.status(200).json({ authUrl });
} 