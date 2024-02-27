/* Core */
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import { recipeSlice, userSlice, initUser } from "@/lib/redux/slices";
import usersReducer from "@/lib/redux/slices/usersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      recipes: recipeSlice.reducer,
      users: usersReducer,
    },
    devTools: true,
    preloadedState: { user: initUser() },
  })
}

/* Types */

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

