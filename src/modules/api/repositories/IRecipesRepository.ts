import Recipe from '@modules/api/infra/entities/Recipe';

export default interface IRecipesRepository {
  getRecipes(query: string, env: string): Promise<Recipe[]>;
  save(recipe: Recipe): Promise<void>;
  findAll(): Promise<Recipe[]>;
}
