import Head from 'next/head';
import { getHubSpotAuthUrl } from '../utils/hubspot';

export default function Home() {
  const handleInstall = async () => {
    const authUrl = await getHubSpotAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>HubSpot OAuth Integration</title>
        <meta name="description" content="Securely connect and manage your HubSpot CRM data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-6">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] mx-auto max-w-5xl">
          <div className="absolute inset-0 max-w-lg mx-auto h-[27rem] blur-[128px] bg-gradient-to-r from-cyan-500/30 to-orange-500/30" />
          
          <div className="relative flex flex-col items-center text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6">
              HubSpot OAuth{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                Integration
              </span>
            </h1>
            <p className="max-w-2xl text-xl text-gray-400 mb-12">
              A secure and efficient way to integrate HubSpot CRM with your applications. Built with modern OAuth standards.
            </p>
            
            <div className="flex gap-6 flex-col sm:flex-row">
              <button
                onClick={handleInstall}
                className="px-8 py-4 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-100 transition-colors duration-150"
              >
                Connect HubSpot
              </button>
              <a
                href="/bluesky"
                className="px-8 py-4 text-lg font-medium rounded-lg border border-gray-700 text-white hover:border-gray-600 transition-colors duration-150"
              >
                Search Bluesky Profiles
              </a>
              <a
                href="https://developers.hubspot.com/docs/api/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-lg font-medium rounded-lg border border-gray-700 text-white hover:border-gray-600 transition-colors duration-150"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">
              Core Features
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Manages HubSpot contacts securely
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Implements OAuth 2.0 authentication
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Handles automatic token refresh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Provides seamless API integration
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">
              Security Features
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Secure token management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Environment variable protection
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Scoped API permissions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Encrypted data transfer
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} HubSpot OAuth Integration. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 