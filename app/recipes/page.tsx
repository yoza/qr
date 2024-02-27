'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, selectRecipes, useAppDispatch, activeRecipe } from "@/lib/redux";
import { collectAsync } from "@/lib/redux/slices";
import RecipeItem from "@/app/recipes/components/recipeItem";
import { Recipe } from "@/dbschema/interfaces";
import clsx from "clsx";


export default function Page() {
  const dispatch = useAppDispatch();
  const rec = useAppSelector(selectRecipes);
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    if (!rec.recipes?.length) {
      dispatch(collectAsync())
    }
  }, [rec, dispatch]);

  const handleRowClick = useCallback((rec: Recipe) => {
    dispatch(activeRecipe(rec.id));
    setRecipe(rec);
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 mt-2">
      <div className="grid grid-cols-5 gap-6 grid-flow-col auto-cols-max md:auto-cols-min ">
        <div className="pt-3 col-span-1 absolute sm:relative md:h-full justify-start hidden sm:block">
          <ul className="flex justify-center flex-wrap items-start">
            {rec?.recipes?.map(recipe => (
              <li key={recipe.id} className={clsx("gap-x-1 gap-y-2 w-full p-2 font-medium",
                {
                  "text-sky-700": recipe.id === rec.active,
                  "text-stone-700": recipe.id !== rec.active,
                })}
              >
                <button type="button" onClick={() => handleRowClick(recipe)}><span className="truncate">{recipe.name}</span></button>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-3 col-span-4">
          <RecipeItem recipe={recipe} />
        </div>
      </div>
    </div>
  )
}
