import { Router } from 'express';
import recipesRouter from '@modules/api/infra/http/routes/recipes.routes';

const routes = Router();

routes.use('/recipes', recipesRouter);

export default routes;
