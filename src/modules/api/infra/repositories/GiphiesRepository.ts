import axios from 'axios';

import Giphy from '@modules/api/infra/entities/Giphy';
import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';

class GiphiesRepository implements IGiphiesRepository {
  public async getGif(query: string, env: string): Promise<Giphy> {
    const request = axios.get(env, {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        limit: 1,
        q: query,
      },
    });

    const response = await request;

    const gif: Giphy = {
      url: response.data.data[0].images.original.url as string,
    };

    return gif;
  }
}

export default GiphiesRepository;
