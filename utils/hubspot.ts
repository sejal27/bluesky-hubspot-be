import axios from 'axios';

export const getHubSpotAuthUrl = async () => {
  const response = await fetch('/api/hubspot/auth-url');
  const data = await response.json();
  return data.authUrl;
};

export const refreshHubSpotToken = async (refreshToken: string) => {
  try {
    const response = await axios.post('https://api.hubapi.com/oauth/v1/token', null, {
      params: {
        grant_type: 'refresh_token',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}; 