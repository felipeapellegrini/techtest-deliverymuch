import { Router } from 'express';

import RecipesController from '../controllers/recipe';

const recipesRouter = Router();
const recipesController = new RecipesController();

recipesRouter.get('/', recipesController.index);

export default recipesRouter;
