import { useAppSelector, selectRecipes, RecipeState } from "@/lib/redux";

const CheckStore = (): RecipeState => useAppSelector(selectRecipes);

export default CheckStore;
