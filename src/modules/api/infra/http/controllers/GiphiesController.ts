import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindGiphiesService from '@modules/api/services/FindGiphiesService';

export default class GiphiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const query = request.query.q as string;

    const findGiphies = container.resolve(FindGiphiesService);

    const giphy = await findGiphies.execute(query);

    return response.json(giphy);
  }
}
