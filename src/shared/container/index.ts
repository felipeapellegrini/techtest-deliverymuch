import { container } from 'tsyringe';

import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';
import GiphiesRepository from '@modules/api/infra/repositories/GiphiesRepository';

import IRecipesRepository from '@modules/api/repositories/IRecipesRepository';
import RecipesRepository from '@modules/api/infra/repositories/RecipesRepository';

container.registerSingleton<IGiphiesRepository>(
  'GiphiesRepository',
  GiphiesRepository,
);

container.registerSingleton<IRecipesRepository>(
  'RecipesRepository',
  RecipesRepository,
);
