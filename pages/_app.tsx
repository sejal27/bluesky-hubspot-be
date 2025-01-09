import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>HubSpot Bluesky Profile Integration</title>
      </Head>
      <Navigation />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </div>
  )
} 