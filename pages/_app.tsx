import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation'
import Disclaimer from '../components/Disclaimer'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>HubSpot Bluesky Integration</title>
        <meta name="description" content="Integrate your HubSpot contacts with Bluesky social network" />
      </Head>
      <Navigation />
      <main className="pt-16 pb-10 flex-grow">
        <Component {...pageProps} />
      </main>
      <Disclaimer />
    </div>
  )
} 