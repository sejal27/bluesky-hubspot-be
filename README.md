# HubSpot Bluesky Integration

An experimental integration between HubSpot and Bluesky.

## Security Notes

- This is an experimental app and not an official HubSpot product
- Always use HTTPS in production
- Never commit `.env` files
- Set up proper environment variables before deploying
- See SECURITY.md for more details

## Setup

1. Copy `.env.example` to `.env.local`
2. Fill in your environment variables
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

## Environment Variables

Required environment variables are documented in `.env.example`. Never commit actual credentials to version control.

## Deployment

### Deploy on Vercel

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your forked repository
4. Configure the following environment variables in Vercel:
   - `HUBSPOT_CLIENT_ID`: Your HubSpot app's client ID
   - `HUBSPOT_CLIENT_SECRET`: Your HubSpot app's client secret
   - `HUBSPOT_APP_ID`: Your HubSpot app ID
   - `HUBSPOT_REDIRECT_URI`: Your OAuth callback URL (e.g. `https://your-domain.com/api/oauth/callback`)
   - `BLUESKY_IDENTIFIER`: Your Bluesky handle (e.g. `user.bsky.social`)
   - `BLUESKY_PASSWORD`: Your Bluesky app password
5. Deploy the project

### Local Development

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Configure environment variables in `.env.local`:
   ```
   HUBSPOT_CLIENT_ID=xxx
   HUBSPOT_CLIENT_SECRET=xxx
   HUBSPOT_APP_ID=xxx
   HUBSPOT_REDIRECT_URI=http://localhost:3000/api/oauth/callback
   BLUESKY_IDENTIFIER=xxx.bsky.social
   BLUESKY_PASSWORD=xxx
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

### HubSpot Setup

1. Create a new app in [HubSpot Developer Portal](https://developers.hubspot.com)
2. Configure OAuth:
   - Add scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`
   - Set redirect URL to match your `HUBSPOT_REDIRECT_URI`
3. Get client ID and secret from app settings
4. Install the app in your HubSpot portal
