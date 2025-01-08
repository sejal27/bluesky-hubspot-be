import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  text: string;
  uri: string;
  cid: string;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  indexedAt: string;
}

interface BlueskyProfileProps {
  profile: {
    displayName?: string;
    description?: string;
    handle: string;
    avatar?: string;
    followersCount?: number;
    followsCount?: number;
    postsCount?: number;
  };
  posts: Post[];
}

export default function BlueskyProfile({ profile, posts }: BlueskyProfileProps) {
  return (
    <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
      {/* Banner - using a placeholder gradient */}
      <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900" />
      
      {/* Profile Info */}
      <div className="px-4 pb-4">
        {/* Avatar - positioned to overlap banner */}
        <div className="relative -mt-16 mb-4">
          <div className="inline-block rounded-full border-4 border-black overflow-hidden">
            <div className="relative w-32 h-32">
              <Image
                src={profile.avatar || '/default-avatar.png'}
                alt={profile.displayName || 'Profile'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name and Handle */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{profile.displayName}</h2>
          <p className="text-gray-500">@{profile.handle}</p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-white whitespace-pre-wrap">{profile.description}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <a 
            href={`https://bsky.app/profile/${profile.handle}/follows`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span className="text-white font-bold">{profile.followsCount}</span>{' '}
            <span className="text-gray-500">Following</span>
          </a>
          <a 
            href={`https://bsky.app/profile/${profile.handle}/followers`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span className="text-white font-bold">{profile.followersCount}</span>{' '}
            <span className="text-gray-500">Followers</span>
          </a>
          <a 
            href={`https://bsky.app/profile/${profile.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span className="text-white font-bold">{profile.postsCount}</span>{' '}
            <span className="text-gray-500">Posts</span>
          </a>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-800">
        <h3 className="px-4 py-3 text-white font-semibold border-b border-gray-800">
          Recent Posts
        </h3>
        <div className="divide-y divide-gray-800">
          {posts.map((post) => (
            <div key={post.cid} className="px-4 py-4">
              <div className="mb-2">
                <p className="text-white mb-2">{post.text}</p>
                <span className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(post.indexedAt))} ago
                </span>
              </div>
              <div className="flex gap-6 text-sm text-gray-500">
                <a
                  href={`https://bsky.app/profile/${profile.handle}/post/${post.uri.split('/').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  💬 {post.replyCount}
                </a>
                <span>🔁 {post.repostCount}</span>
                <span>❤️ {post.likeCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Profile Link */}
      <a
        href={`https://bsky.app/profile/${profile.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-3 border-t border-gray-800 text-blue-400 hover:bg-gray-900 transition-colors"
      >
        View on Bluesky →
      </a>
    </div>
  );
} 