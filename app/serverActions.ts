'use server'
import { client } from "./api/ingredient/~route";
import e from '@/dbschema/edgeql-js';

export async function searchRecipe(/* value: string */) {
  /*   const result = await e.select(e.Recipe, () => ({
      name: true,
      description: true,
    })).run(client); */

  /*   const query = e.select(e.Recipe, () => ({
      id: true,
      name: true,
      description: true
    })); */

  /*   const res = (e.select(e.fts.search(
      e.Recipe,
      e.fts.with_options(
        {e.fts.Language.rus})

    )))); */

  /*  const res1 = e.select(res.object { name, description, score: res.score }
   order by res.score desc;) */



  // const query1 = e.select(e.fts.search(e.Recipe, "Борщ"/* , e.fts.Language.rus */));


  /*   with res := (select fts:: search(Recipe, 'Борщ', language := 'rus'))
    select res.object { name, description, score := res.score } order by res.score desc; */


  const res = e.select(e.fts.search(e.Recipe, "Борщ"));

  const query = e.select(res.object, () => ({
    name: true,
    description: true,
    scope: res.score,
    order_by: {
      expression: res.score,
      direction: e.DESC,
    }
  }));

  const result = await query.run(client);
  //const query1 = e.select(res.object { name, description, score := res.score });

  /* const query1 = e.select(e.Recipe, recipe => ({
     name: true,
     description: true,
        order_by: recipe.name,
   }));*/

  //const result = await query.run(client);


  /*   const result = await client.execute(`with res := (
        select fts::search(Recipe, 'Борщ', language := 'rus')
      )
      select res.object { name, description, score := res.score }
      order by res.score desc;
    `); */
  // console.log(JSON.stringify(result, null, 2));
  return result
}

export interface RecipeInput {
  name: string;
  description: string;
}

export async function insertRecipe(recipe: RecipeInput) {
  const result = await e.insert(e.Recipe, { ...recipe }).run(client);
  console.log(JSON.stringify(result, null, 2));
  return result;
}
