'use server'
import { getRecipes, pageRecipe, type RecipeRows } from '@/app/actions';
import { auth } from "@/app/db";


export const collectRecipes = async (): Promise<RecipeRows> => {
  const session = auth.getSession();
  const page: pageRecipe = {
    offset: 0,
    limit: 10
  }
  const result = await getRecipes(page, session.client);
  return result
}
