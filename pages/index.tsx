import Head from 'next/head';
import { getHubSpotAuthUrl } from '../utils/hubspot';
import Link from 'next/link';
import Disclaimer from '../components/Disclaimer';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const handleInstall = async () => {
    const authUrl = await getHubSpotAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Head>
        <title>HubSpot Bluesky Profile Integration</title>
        <meta name="description" content="Securely connect and manage your HubSpot CRM data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-6">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] mx-auto max-w-5xl">
          <div className="absolute inset-0 max-w-lg mx-auto h-[27rem] blur-[128px] bg-gradient-to-r from-cyan-500/30 to-orange-500/30" />
          
          <div className="relative flex flex-col items-center text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                HubSpot 
              </span> BlueSky Profile Integration
            </h1>
            <p className="max-w-2xl text-xl text-gray-400 mb-12">
              View Bluesky profile and posts for the contacts on the HubSpot record page.
            </p>
            
            <div className="flex gap-6 flex-col sm:flex-row">
              <button
                onClick={handleInstall}
                className="px-8 py-4 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-100 transition-colors duration-150"
              >
                Connect HubSpot
              </button>
              <Link
                href="/bluesky"
                className="px-8 py-4 text-lg font-medium rounded-lg border border-gray-700 text-white hover:border-gray-600 transition-colors duration-150"
              >
                Search Bluesky Profiles
              </Link>
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
        {/* Features Section */}
        <div className="py-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Source Code</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              title="Backend Repository"
              description="Next.js application deployed on Vercel that handles HubSpot OAuth, custom property creation, and Bluesky profile integration."
              repoUrl="https://github.com/sejal27/bluesky-hubspot-be"
            />
            <FeatureCard 
              title="HubSpot UI Extension"
              description="HubSpot application with UI extension that displays Bluesky profiles and posts on contact record pages."
              repoUrl="https://github.com/sejal27/bluesky-hubspot-uie"
            />
          </div>
        </div>

      </main>
      <Disclaimer />
    </div>
  );
} 