import { Router } from 'express';
import recipesRouter from '../../entities/recipes/recipes.routes';

const routes = Router();

routes.use('/recipes', recipesRouter);

export default routes;
