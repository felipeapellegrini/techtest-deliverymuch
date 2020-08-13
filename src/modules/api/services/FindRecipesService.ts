import { injectable, inject } from 'tsyringe';

import Recipe from '@modules/api/infra/entities/Recipe';
import AppError from '@shared/errors/AppError';
import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';
import IRecipesRepository from '@modules/api/repositories/IRecipesRepository';

interface IOutput {
  keywords: string[];
  recipes: Recipe[];
}

@injectable()
class FindRecipesService {
  constructor(
    @inject('GiphiesRepository')
    private giphiesRepository: IGiphiesRepository,

    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) {}

  public async execute(query: string): Promise<IOutput> {
    const env = process.env.RECIPE_PUPPY_API;
    const gifEnv = process.env.GIPHY_API;
    if (!env || !gifEnv) {
      throw new AppError('Missing environment variables.');
    }

    if (!query) {
      throw new AppError('Provide from 1 to 3 ingredients.');
    }

    const ingredientsList = query.split(', ');

    if (ingredientsList.length === 0 || ingredientsList.length > 3) {
      throw new AppError('Provide from 1 to 3 ingredients.');
    }

    const recipes = await this.recipesRepository.getRecipes(query, env);

    for (const recipe of recipes) {
      const title = recipe.title.trim();

      const { ingredients, href } = recipe;

      const gif = await this.giphiesRepository.getGif(query, gifEnv);

      await this.recipesRepository.save({
        title,
        ingredients,
        href,
        gif: gif.url,
      });
    }

    const output: IOutput = {
      keywords: ingredientsList.sort(),
      recipes: await this.recipesRepository.findAll(),
    };

    return output;
  }
}

export default FindRecipesService;
