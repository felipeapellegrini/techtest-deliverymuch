import { Request, Response } from 'express';
import axios from 'axios';
import getGif from '../gif/gif';
import AppError from '../../config/AppError';

interface IRecipe {
  title: string;
  ingredients: string[];
  href: string;
  gif?: string | undefined;
}

export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const ingredients = this.parseInput(request.query.i as string);

      const recipes = await this.findRecipes(request.query.i as string);

      const recipesList: IRecipe[] = [];

      for (const recipe of recipes) {
        const title = recipe.title.trim();

        const gif = await getGif(title);

        recipesList.push({
          title,
          ingredients: recipe.ingredients,
          href: recipe.href,
          gif,
        });
      }

      return response.json({
        keywords: ingredients.sort(),
        recipes: recipesList,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  parseInput = (param: string): string[] => {
    const output = param.split(', ');
    if (output.length === 0 || output.length > 3) {
      throw new AppError('Provide from 1 to 3 ingredients');
    }

    return output;
  };

  findRecipes = async (ingredients: string): Promise<IRecipe[]> => {
    const env = process.env.RECIPEPUPPY_API;
    if (!env) {
      throw new AppError('Missing environment variables.');
    }
    const request = axios.get(env, {
      params: {
        i: ingredients,
      },
    });
    const response = await request;
    return response.data.results;
  };
}
