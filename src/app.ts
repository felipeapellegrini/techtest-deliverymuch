import express from 'express';
import axios from 'axios';

import AppError from './AppError';

interface IRecipe {
  title: string;
  ingredients: string[];
  href: string;
  gif?: string | undefined;
}

const app = express();

app.use(express.json());

const RECIPEPUPPY_API = 'http://www.recipepuppy.com/api/';
const GIPHY_API = 'http://api.giphy.com/v1/gifs/search';
const { GIPHY_API_KEY } = process.env;

app.get('/', async (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.get('/recipes/', async (request, response) => {
  try {
    const ingredients = parseInput(request.query.i as string);

    const recipes = await getRecipes(request.query.i as string);

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
});

const getGif = async (query: string): Promise<string> => {
  const request = axios.get(GIPHY_API, {
    params: {
      api_key: GIPHY_API_KEY,
      limit: 1,
      q: query,
    },
  });

  const response = await request;

  return response.data.data[0].images.original.url;
};

const parseInput = (param: string) => {
  const output = param.split(', ');
  if (output.length === 0 || output.length > 3) {
    throw new AppError('Provide from 1 to 3 ingredients');
  }

  return output;
};

const getRecipes = async (ingredients: string): Promise<IRecipe[]> => {
  const request = axios.get(RECIPEPUPPY_API, {
    params: {
      i: ingredients,
    },
  });
  const response = await request;
  return response.data.results;
};

export default app;
