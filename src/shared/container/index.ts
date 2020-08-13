import { container } from 'tsyringe';

import IGiphiesRepository from '@modules/api/repositories/IGiphiesRepository';
import GiphiesRepository from '@modules/api/infra/repositories/GiphiesRepository';

container.registerSingleton<IGiphiesRepository>(
  'GiphiesRepository',
  GiphiesRepository,
);
