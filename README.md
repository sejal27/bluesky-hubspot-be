# Bluesky HubSpot Integration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## API Documentation

### Bluesky Profile Endpoint

Get a user's Bluesky profile information.

```http
GET /api/bluesky/profile?handle={handle}
```

| Parameter | Type     | Description                                             |
| --------- | -------- | ------------------------------------------------------- |
| `handle`  | `string` | **Required**. Bluesky handle (e.g., `user.bsky.social`) |

#### Response

```json
{
  "displayName": "string",
  "description": "string",
  "avatar": "string",
  "followersCount": "number",
  "followsCount": "number",
  "postsCount": "number"
}
```

### Bluesky Posts Endpoint

Get a user's Bluesky posts with pagination support.

```http
GET /api/bluesky/posts?handle={handle}&limit={limit}&cursor={cursor}
```

| Parameter | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| `handle`  | `string` | **Required**. Bluesky handle                      |
| `limit`   | `number` | Optional. Number of posts to return (default: 10) |
| `cursor`  | `string` | Optional. Pagination cursor for next page         |

#### Response

```json
{
  "posts": [
    {
      "uri": "string",
      "text": "string",
      "likeCount": "number",
      "repostCount": "number",
      "replyCount": "number",
      "postedAt": "string"
    }
  ],
  "cursor": "string | null"
}
```

### Example API Usage

```bash
# Fetch profile
curl "http://localhost:3000/api/bluesky/profile?handle=user.bsky.social"

# Fetch posts (first page)
curl "http://localhost:3000/api/bluesky/posts?handle=user.bsky.social&limit=5"

# Fetch posts (next page)
curl "http://localhost:3000/api/bluesky/posts?handle=user.bsky.social&limit=5&cursor={cursor_from_previous_response}"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
