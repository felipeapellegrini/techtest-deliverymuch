import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindRecipesService from '@modules/api/services/FindRecipesService';

export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const query = request.query.i as string;

      const findRecipes = container.resolve(FindRecipesService);

      const input = await findRecipes.execute(query);

      return response.json(input);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
