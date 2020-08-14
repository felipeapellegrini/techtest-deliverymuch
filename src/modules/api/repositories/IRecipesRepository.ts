import Recipe from '@modules/api/infra/entities/Recipe';

export default interface IRecipesRepository {
  getRecipes(query: string): Promise<Recipe[]>;
}
