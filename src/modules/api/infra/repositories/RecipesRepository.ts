import axios from 'axios';
import IRecipesRepository from '@modules/api/repositories/IRecipesRepository';

interface IRecipe {
  title: string;
  ingredients: string[];
  href: string;
  gif?: string | undefined;
}

class RecipesRepository implements IRecipesRepository {
  private recipes: IRecipe[] = [];

  public async getRecipes(query: string, env: string): Promise<IRecipe[]> {
    const request = axios.get(env, {
      params: {
        i: query,
      },
    });
    const response = await request;

    return response.data.results;
  }

  public async save(recipe: IRecipe): Promise<void> {
    this.recipes.push(recipe);
  }

  public async findAll(): Promise<IRecipe[]> {
    return this.recipes;
  }
}

export default RecipesRepository;
