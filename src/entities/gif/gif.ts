import axios from 'axios';
import AppError from '../../config/AppError';

const getGif = async (query: string): Promise<string> => {
  const env = process.env.GIPHY_API;
  if (!env) {
    throw new AppError('Missing environment variables.');
  }
  const request = axios.get(env, {
    params: {
      api_key: process.env.GIPHY_API_KEY,
      limit: 1,
      q: query,
    },
  });

  const response = await request;

  return response.data.data[0].images.original.url;
};

export default getGif;
