import axios from 'axios';

import Giphy from '@modules/api/infra/entities/Giphy';
import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';

class GiphiesRepository implements IGiphiesRepository {
  public async getGif(query: string): Promise<Giphy> {
    const request = axios.get(process.env.GIPHY_API as string, {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        limit: 1,
        q: query,
      },
    });

    const response = await request;
    const { url } = response.data.data[0].images.original;

    const gif: Giphy = {
      url,
    };

    return gif;
  }
}

export default GiphiesRepository;
