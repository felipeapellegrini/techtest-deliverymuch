import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Recipe from '@modules/api/infra/entities/Recipe';
import IRecipesRepository from '@modules/api/repositories/IRecipesRepository';
import AppError from '../../../shared/errors/AppError';

interface IOutput {
  keywords: string[];
  recipes: Recipe[];
}

@injectable()
class FindRecipesService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) {}

  public async execute(query: string): Promise<IOutput> {
    if (!query) {
      throw new AppError('Provide from 1 to 3 ingredients.');
    }

    const ingredientsList = query.split(', ');

    if (ingredientsList.length === 0 || ingredientsList.length > 3) {
      throw new AppError('Provide from 1 to 3 ingredients.');
    }

    const recipes = await this.recipesRepository.getRecipes(query);

    const output: IOutput = {
      keywords: ingredientsList.sort(),
      recipes,
    };

    return output;
  }
}

export default FindRecipesService;
