import { Router } from 'express';
import giphiesRouter from '@modules/api/infra/http/routes/giphies.routes';

const routes = Router();

routes.use('/giphy', giphiesRouter);

export default routes;
