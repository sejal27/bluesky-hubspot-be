import type { NextApiRequest, NextApiResponse } from 'next';
import { BskyAgent, AppBskyFeedDefs } from '@atproto/api';

const agent = new BskyAgent({ service: 'https://bsky.social' });
const POSTS_PER_PAGE = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { handle, cursor, limit } = req.query;
  const postsLimit = limit ? parseInt(limit as string, 10) : POSTS_PER_PAGE;

  if (!handle || typeof handle !== 'string') {
    return res.status(400).json({ error: 'Handle is required' });
  }

  try {
    await agent.login({
      identifier: process.env.BLUESKY_SERVICE_IDENTIFIER!,
      password: process.env.BLUESKY_SERVICE_PASSWORD!,
    });

    const feed = await agent.getAuthorFeed({
      actor: handle,
      limit: postsLimit,
      cursor: cursor as string | undefined,
    });

    const posts = feed.data.feed.map(post => ({
      uri: post.post.uri,
      text: (post.post.record as AppBskyFeedDefs.PostView).text,
      likeCount: post.post.likeCount,
      repostCount: post.post.repostCount,
      replyCount: post.post.replyCount,
      postedAt: post.post.indexedAt,
    }));

    return res.status(200).json({
      posts,
      cursor: feed.data.cursor || null,
    });
  } catch (error) {
    console.error('Error fetching Bluesky posts:', error);
    res.status(500).json({ error: 'Failed to fetch Bluesky posts' });
  }
} 