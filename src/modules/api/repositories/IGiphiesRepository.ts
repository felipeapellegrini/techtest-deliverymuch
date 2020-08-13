import Giphy from '../infra/entities/Giphy';

export default interface IGiphiesRepository {
  getGif(gif: Giphy): Promise<Giphy>;
}
