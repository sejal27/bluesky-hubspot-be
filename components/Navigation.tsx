import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navigation() {
  const router = useRouter();
  
  return (
    <nav className="bg-black border-b border-gray-800 fixed top-0 w-full z-10">
      <div className="flex items-center justify-between h-16 px-6 max-w-[1200px] mx-auto">
        <div className="flex items-center space-x-8">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${
              router.pathname === '/' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/bluesky" 
            className={`text-sm font-medium transition-colors ${
              router.pathname === '/bluesky' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bluesky Profile Search
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://www.linkedin.com/in/sejalparikh/"
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </Link>
          <Link
            href="https://bsky.app/profile/sejalparikh.bsky.social"
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Image 
              src="/bluesky.png" 
              alt="Bluesky" 
              width={30} 
              height={30} 
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
} 