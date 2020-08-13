import Giphy from '../infra/entities/Giphy';

export default interface IGiphiesRepository {
  getGif(query: string, env: string): Promise<Giphy>;
}
