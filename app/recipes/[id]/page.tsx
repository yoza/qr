'use client'
import { useEffect } from 'react';
import { collectAsync } from "@/lib/redux/slices";
import { usePathname } from 'next/navigation';
// import RecipeForm from '../ui/form';
import { useAppSelector, selectRecipes, useAppDispatch } from "@/lib/redux";
import RecipeItem from "@/app/recipes/components/recipeItem";


export default function RecipeView() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const path = pathname.split('/').pop() || undefined;
  const rec = useAppSelector(selectRecipes);

  useEffect(() => {
    if (!rec.recipes?.length) {
      dispatch(collectAsync())
    }
  }, [rec, dispatch]);

  const recipe = rec.recipes?.find(r => r.id === path);

  return (recipe ?
    <div className="container mx-auto px-4">
      <RecipeItem recipe={recipe} />
    </div>
    : null
  )

  // return (
  //   <div>
  //     {path && decodeURI(path)}
  //   </div>
  /*     <div className="grid grid-cols-1 gap-6">
        <RecipeForm id={path | null} />
      </div> */
  // )
}
