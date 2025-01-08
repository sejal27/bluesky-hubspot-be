import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlueskyProfile } from '../../../utils/bluesky';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { handle } = req.query;

  if (!handle || typeof handle !== 'string') {
    return res.status(400).json({ error: 'Handle is required' });
  }

  try {
    const profile = await getBlueskyProfile(handle);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching Bluesky profile:', error);
    res.status(500).json({ error: 'Failed to fetch Bluesky profile' });
  }
} 