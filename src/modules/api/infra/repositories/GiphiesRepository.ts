import Giphy from '@modules/api/infra/entities/Giphy';
import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';

class GiphiesRepository implements IGiphiesRepository {
  private giphies: Giphy[] = [];

  public async getGif(gif: Giphy): Promise<Giphy> {
    this.giphies.push(gif);

    return gif;
  }
}

export default GiphiesRepository;
