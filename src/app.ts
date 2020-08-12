import express from 'express';
import axios from 'axios';

interface IRecipe {
  title: string;
  ingredients: string;
  link: string;
  gif?: string;
}

const app = express();

app.use(express.json());

const RECIPEPUPPY_API = 'http://www.recipepuppy.com/about/api/';
const GIPHY_API = 'http://api.giphy.com/v1/gifs/search';
const { GIPHY_API_KEY } = process.env;

app.get('/', (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.get('/recipes/', (request, response) => {
  const ingredients = request.query.i;

  if (!ingredients) {
    return response.status(400).send({
      error: 'Provide at least one ingredient, please.',
    });
  }

  const ingredientsList = ingredients.toString().split(', ');
  if (ingredientsList.length > 3) {
    return response.status(400).send({
      error: 'Too many ingredients, provide a maximum of three ingredients',
    });
  }

  const recipesList = getRecipes(ingredientsList).then(recipes => {
    console.log(recipes.data);
    response.json({
      keywords: ingredientsList,
      recipes: handleRecipes(recipes.data.results),
    });
  });

  return recipesList;
});

app.get('/giphy/', (request, response) => {
  const query = String(request.query.q);
  getGif(query)
    .then(results => {
      response.send(results.data.data[0].images.original.url);
    })
    .catch(error => {
      response.send({
        status: error.response.status,
        message: error.message,
      });
    });
});

function getGif(query: string) {
  return axios.get(GIPHY_API, {
    params: {
      api_key: GIPHY_API_KEY,
      limit: 1,
      q: query,
    },
  });
}

function getRecipes(ingredients: string[]) {
  return axios.get(RECIPEPUPPY_API, {
    params: {
      i: ingredients,
    },
  });
}

function handleRecipes(recipes: IRecipe[]): IRecipe[] {
  const processedRecipes: IRecipe[] = [];

  recipes.map(recipe => {
    const { title, ingredients, link, gif } = recipe;

    processedRecipes.push({
      title,
      ingredients,
      link,
      gif,
    });

    return processedRecipes;
  });

  return processedRecipes;
}

export default app;
