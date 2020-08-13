import { Router } from 'express';

import RecipesController from '@modules/api/infra/http/controllers/RecipesController';

const recipesRouter = Router();
const recipesController = new RecipesController();

recipesRouter.get('/', recipesController.index);

export default recipesRouter;
