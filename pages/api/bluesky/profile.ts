import type { NextApiRequest, NextApiResponse } from 'next';
import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent({ service: 'https://bsky.social' });

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
    await agent.login({
      identifier: process.env.BLUESKY_SERVICE_IDENTIFIER!,
      password: process.env.BLUESKY_SERVICE_PASSWORD!,
    });

    const profile = await agent.getProfile({ actor: handle });
    
    return res.status(200).json({
      displayName: profile.data.displayName,
      description: profile.data.description,
      avatar: profile.data.avatar,
      followersCount: profile.data.followersCount,
      followsCount: profile.data.followsCount,
      postsCount: profile.data.postsCount,
    });
  } catch (error) {
    console.error('Error fetching Bluesky profile:', error);
    res.status(500).json({ error: 'Failed to fetch Bluesky profile' });
  }
} 