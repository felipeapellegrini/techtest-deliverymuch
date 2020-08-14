import axios from 'axios';
import IRecipesRepository from '@modules/api/repositories/IRecipesRepository';
import GihpiesRepository from './GiphiesRepository';
import Recipe from '../entities/Recipe';

class RecipesRepository implements IRecipesRepository {
  private recipes: Recipe[] = [];

  public async getRecipes(query: string): Promise<Recipe[]> {
    const giphiesRepository = new GihpiesRepository();
    const request = axios.get(process.env.RECIPE_PUPPY_API as string, {
      params: {
        i: query,
      },
    });
    const response = await request;

    const recipes = response.data.results as Recipe[];

    for (const recipe of recipes) {
      const title = recipe.title.trim();

      const { ingredients, href } = recipe;

      const gif = await giphiesRepository.getGif(title);

      this.recipes.push({
        title,
        ingredients,
        href,
        gif: gif.url,
      });
    }

    return recipes;
  }
}

export default RecipesRepository;
