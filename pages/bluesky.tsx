import Head from 'next/head';
import { useState } from 'react';
import BlueskyProfile from '../components/BlueskyProfile';
import { AppBskyActorDefs } from '@atproto/api';

interface ProfileData {
  profile: AppBskyActorDefs.ProfileView;
  posts: {
    text: string;
    uri: string;
    cid: string;
    replyCount: number;
    repostCount: number;
    likeCount: number;
    indexedAt: string;
  }[];
}

export default function Bluesky() {
  const [handle, setHandle] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/bluesky/profile?handle=${handle}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      setProfileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
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
      </main>
    </div>
  );
} 