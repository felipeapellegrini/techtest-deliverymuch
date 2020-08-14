import RecipesRepository from '../infra/repositories/RecipesRepository';
import FindRecipesService from './FindRecipesService';
import AppError from '../../../shared/errors/AppError';
// import Recipe from '../infra/entities/Recipe';

describe('FindRecipes', () => {
  it('should not be able to pass 0 or more than 3 ingredients', async () => {
    const recipesRepository = new RecipesRepository();
    const findRecipes = new FindRecipesService(recipesRepository);

    await expect(
      findRecipes.execute('onion, garlic, lemon, granade'),
    ).rejects.toBeInstanceOf(AppError);
    await expect(findRecipes.execute('')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to get recipes', async () => {
    const recipesRepository = new RecipesRepository();
    const findRecipes = new FindRecipesService(recipesRepository);

    const output = await findRecipes.execute('onion, garlic, lemon');

    expect(output.keywords).toBe('onion, garlic, lemon');
  });
});
