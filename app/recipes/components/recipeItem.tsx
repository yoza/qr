'use client'
import React, { useEffect } from "react";
import { Recipe } from "@/dbschema/interfaces";
import { useAppSelector, selectRecipes, useAppDispatch } from "@/lib/redux";
import { collectAsync } from "@/lib/redux/slices";


export const spacer = (value: string) => value.split("\n").map((row, index) => <p key={index}>{row}</p>);


export default function RecipeItem(params: { recipe?: Recipe }) {
  const dispatch = useAppDispatch();
  const rec = useAppSelector(selectRecipes);

  useEffect(() => {
    if (!rec.recipes?.length && !params.recipe) {
      dispatch(collectAsync())
    }
  }, [rec, params, dispatch]);

  const recipe = params.recipe ? params.recipe : rec.recipes?.find(r => r.id === rec.active);

  return (
    <div className="pl-4 md:pl-0">
      {recipe ?
        (<article className="mt-1" key={recipe.id}>
          <h1 className="text-2xl font-normal subpixel-antialiased mb-4">{recipe.name}</h1>
          <div key={`${recipe.id}-d`} className="description">{spacer(recipe.description)}</div>
        </article>
        ) : null}
    </div>
  )
}
