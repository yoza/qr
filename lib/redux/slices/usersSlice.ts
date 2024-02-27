import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/dbschema/interfaces';
import { RootState } from "@/lib/redux/store";
import { loadUsers } from '@/lib/redux/slices/thunks';
import { updateUser } from '@/lib/redux/slices';


export interface Customer extends User {
  checked?: boolean;
}

interface UsersState {
  error: string | null | undefined;
  users: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState = {
  users: [],
  error: null,
  status: "idle",
} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, { payload }) => {
      state.users = payload;
    },
    cleanUsers: () => initialState,
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(updateUser.fulfilled, (state) => {
        state.status = "idle";
      })
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    }),
      builder.addCase(loadUsers.pending, (state) => {
        state.status = "loading";
      }),
      builder.addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload,
          state.status = "succeeded"
      }),
      builder.addCase(loadUsers.rejected, (state, action) => {
        state.error = action.error.message,
          state.status = "failed"
      })
  },
})

export const { updateUsers, cleanUsers } = usersSlice.actions;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export default usersSlice.reducer
