import { Router } from 'express';

import GiphiesController from '@modules/api/infra/http/controllers/GiphiesController';

const giphiesRouter = Router();
const giphiesController = new GiphiesController();

giphiesRouter.use('/', giphiesController.create);

export default giphiesRouter;
