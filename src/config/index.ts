import AppError from './AppError';

export default function checkEnvironment(): void {
  if (
    !process.env.RECIPE_PUPPY_API ||
    !process.env.GIPHY_API ||
    !process.env.GIPHY_API_KEY
  ) {
    throw new AppError('Missing environment variables');
  }
}
