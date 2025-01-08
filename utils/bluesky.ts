import { BskyAgent, AppBskyFeedDefs } from '@atproto/api';

const agent = new BskyAgent({ service: 'https://bsky.social' });

export const getBlueskyProfile = async (handle: string) => {
  try {
    await agent.login({
      identifier: process.env.BLUESKY_SERVICE_IDENTIFIER!,
      password: process.env.BLUESKY_SERVICE_PASSWORD!,
    });

    const [profileResponse, feedResponse] = await Promise.all([
      agent.getProfile({ actor: handle }),
      agent.getAuthorFeed({ actor: handle, limit: 5 }),
    ]);

    return {
      profile: profileResponse.data,
      posts: feedResponse.data.feed.map((post: AppBskyFeedDefs.FeedViewPost) => ({
        text: (post.post.record as AppBskyFeedDefs.PostView).text,
        uri: post.post.uri,
        cid: post.post.cid,
        replyCount: post.post.replyCount,
        repostCount: post.post.repostCount,
        likeCount: post.post.likeCount,
        indexedAt: post.post.indexedAt,
      }))
    };
  } catch (error) {
    console.error('Bluesky API Error:', error);
    throw error;
  }
}; 