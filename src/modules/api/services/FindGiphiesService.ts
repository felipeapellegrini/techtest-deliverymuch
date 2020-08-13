import axios from 'axios';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Giphy from '@modules/api/infra/entities/Giphy';
import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';

interface INotFoundGiphy {
  url: string;
}

@injectable()
class FindGiphiesService {
  constructor(
    @inject('GiphiesRepository')
    private giphiesRepository: IGiphiesRepository,
  ) {}

  public async execute(query: string): Promise<Giphy | undefined> {
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

    const gif = response.data.data[0].images.original.url;

    if (!gif) {
      const notFoundGiphy: INotFoundGiphy = {
        url: 'No giphies found.',
      };
      this.giphiesRepository.getGif(notFoundGiphy);
    }

    this.giphiesRepository.getGif(gif);

    return gif;
  }
}

export default FindGiphiesService;
