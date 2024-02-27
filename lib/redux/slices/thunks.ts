/* Instruments */
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { collectRecipes } from "./collectRecipes";

import { uuid } from "edgedb/dist/codecs/ifaces";
import { User } from '@/dbschema/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, updateCustomer } from "@/app/actions";


interface QueryError {
  name: string
  errorMessage: string
}

export const collectAsync = createAppAsyncThunk(
  "recipes/collectRecipes",
  async () => {
    const response = await collectRecipes();

    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);

export const updateUser = createAsyncThunk<
  Promise<{ id: string } | Partial<User> | unknown>,
  { id: uuid } & Partial<User>,
  { rejectValue: QueryError }
>
  ('users/update', async (userData, { rejectWithValue }) => {
    try {
      const { id, ...fields } = userData
      return await updateCustomer(id, fields)
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue({
          errorMessage: err.message,
          name: err.name
        })
      }
    }
  }
  )

export const loadUsers = createAsyncThunk<User[]>('users/load', async () => {
  try {
    const response = await getUsers()
    return response
  } catch (err: any) {
    return err.message;
  }
})
