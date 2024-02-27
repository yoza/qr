import { createSlice/* , PayloadAction */ } from '@reduxjs/toolkit';
import { RecipeRows } from "@/app/actions"
import { collectAsync } from './thunks';
import { RootState } from "../store";


export interface RecipeState {
  recipes?: RecipeRows,
  active: string,
  status: "idle" | "loading" | "failed";
}

const initialState: RecipeState = {
  recipes: [],
  active: "",
  status: "idle"
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipes: (state, { payload }) => {
      state.recipes = payload;
      state.active = payload[0].id;
    },
    activeRecipe: (state, { payload }) => {
      state.active = payload;
    },
    cleanRecipes: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(collectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(collectAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.recipes = action.payload;
        state.active = action.payload[0].id;
      });
  },
});

export const { addRecipes, cleanRecipes, activeRecipe } = recipeSlice.actions;
export const selectRecipes = (state: RootState) => state.recipes;
export default recipeSlice.reducer;
