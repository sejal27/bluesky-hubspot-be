import Head from 'next/head';
import { useState } from 'react';
import BlueskyProfile from '../components/BlueskyProfile';

interface Profile {
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
}

interface Post {
  text: string;
  uri: string;
  cid: string;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  indexedAt: string;
}

export default function Bluesky() {
  const [handle, setHandle] = useState('');
  const [profileData, setProfileData] = useState<{ profile: Profile; posts: Post[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCursor(null);

    try {
      // First fetch profile
      const profileResponse = await fetch(`/api/bluesky/profile?handle=${handle}`);
      const profileData = await profileResponse.json();
      
      if (!profileResponse.ok) throw new Error(profileData.error);

      // Then fetch posts
      const postsResponse = await fetch(`/api/bluesky/posts?handle=${handle}&limit=5`);
      const postsData = await postsResponse.json();

      if (!postsResponse.ok) throw new Error(postsData.error);

      setProfileData({
        profile: profileData,
        posts: postsData.posts
      });
      setCursor(postsData.cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (!cursor || !profileData || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const postsResponse = await fetch(`/api/bluesky/posts?handle=${handle}&limit=5&cursor=${cursor}`);
      const postsData = await postsResponse.json();

      if (!postsResponse.ok) throw new Error(postsData.error);

      setProfileData(prev => ({
        profile: prev!.profile,
        posts: [...prev!.posts, ...postsData.posts]
      }));
      setCursor(postsData.cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Bluesky Profile Search</title>
        <meta name="description" content="Search and view Bluesky profiles" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Bluesky Profile Search</h1>
          <p className="text-gray-400">Enter a Bluesky handle to view their profile</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter Bluesky handle (e.g., jay.bsky.social)"
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {profileData && <BlueskyProfile profile={profileData.profile} posts={profileData.posts} />}

        {cursor && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMorePosts}
              disabled={loadingMore}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More Posts'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 