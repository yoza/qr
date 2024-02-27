'use server'
import e, { type $infer } from '@/dbschema/edgeql-js';
import { RecipeIngredient, User } from '@/dbschema/interfaces';
import { Client } from 'edgedb';
import { std } from "@/dbschema/interfaces";
import { client, auth } from './db';
import { TokenData } from "@edgedb/auth-nextjs/app";
import { uuid } from 'edgedb/dist/codecs/ifaces';
import { DateTime } from "luxon";


export interface RecipeRow extends std.$Object {
  ingredients?: RecipeIngredient[];
  description: string;
  name: string;
}

export interface UserEmail {
  email: string;
}

export interface queryParams { }
export interface IngredientInput {
  name: string;
  description?: string;
}

export async function insertIngredient(ingredient: IngredientInput) {
  const result = await e.insert(e.Ingredient, { ...ingredient }).run(client);
  console.log(JSON.stringify(result, null, 2));
  return result;
}

const queryRecipes = e.params({ offset: e.int64, limit: e.int64 }, (params) =>
  e.select(e.Recipe, rec => ({
    id: true,
    name: true,
    description: true,
    ingredients: () => ({
      id: true,
      name: true,
      description: false,
      unit: true,
      quantity: true
    }),
    order_by: {
      expression: rec.name,
      direction: e.DESC,
    },
    limit: params.limit,
    offset: params.offset,
  }))
);

export type RecipeRows = $infer<typeof queryRecipes>;

export interface pageRecipe {
  offset: number,
  limit: number
}

export async function getRecipes(page: pageRecipe, client: Client) {
  const recipes: RecipeRows = await queryRecipes.run(client, { ...page })
  return recipes;
}

// Auth actions

export const {
  signout,
  emailPasswordSignIn,
  emailPasswordSignUp,
  emailPasswordSendPasswordResetEmail,
  emailPasswordResetPassword,
  emailPasswordResendVerificationEmail,
} = auth.createServerActions();


export async function createUser(
  tokenData: TokenData,
) {
  const userEmail = (await getEmail(tokenData))?.email || "";

  await e.insert(e.User, {
    name: "",
    email: userEmail,
    identity: e.assert_exists(
      e.select(e.ext.auth.Identity, () => ({
        filter_single: { id: tokenData.identity_id },
      }))
    ),
  }).run(client);
}

export async function getEmail(tokenData: TokenData) {

  const userEmail = await client.querySingle<UserEmail>(
    `
     with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
     select ext::auth::EmailFactor { email }
     filter .identity = identity`,
    {
      identity_id: tokenData.identity_id,
    }
  );
  return userEmail;
}

export async function getUser(client: Client) {
  const user: User | null = await client.querySingle(
    `select global currentUser { * }`
  );
  return user
}
/* 
const queryUsers = e.select(e.User, () => ({
  ...e.User['*'],
  identity: () => ({ ...e.ext.auth.Identity['*'] }) 
  })
); */


export async function getUsers() {
  const session = auth.getSession();
  const query = e.select(e.User, () => ({
    ...e.User['*'],
    identity: () => ({ ...{}, subject: true, modified_at: true, id: true })
  }));
  const data = await query.run(session.client)
  return data?.map(user => {
    return {
      ...user,
      identity: {
        ...user.identity,
        modified_at: DateTime.fromJSDate(user.identity.modified_at, { zone: 'UTC' }).toJSON()
      }
    };
  });
  // const users: User[] = await session.client.query(
  //   `select User { * }`
  // );
  // return users
}

export async function updateCustomer(id: uuid, fields: Partial<User>) {
  const session = auth.getSession();

  const partialUser = {
    avatar: e.optional(e.str),
    name: e.optional(e.str),
    email: e.optional(e.str),
    is_admin: e.optional(e.bool)
  }

  const query = e.params(partialUser, (params) =>
    e.update(e.User, (user) => ({
      filter_single: { id },
      set: {
        ...params,
        is_admin: e.op(params.is_admin, "??", user.is_admin),
        avatar: e.op(params.avatar, "??", user.avatar),
        name: e.op(params.name, "??", ""),
        email: e.op(params.email, "??", user.email),
      }
    }))
  );

  type PartialUser = $infer<typeof query>;
  const user: PartialUser = await query.run(session.client, { ...fields })
  return user
}
