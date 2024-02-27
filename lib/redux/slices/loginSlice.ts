import { createSlice } from "@reduxjs/toolkit";
import { loadState, deleteState, saveState } from "@/lib/redux/localStorage";
import { userKey } from "@/constants/i18n";

export function initUser(): UserState {
  return loadState(userKey) || initialState;
}

const initialState: UserState = {
  isSignedIn: false,
  email: undefined,
  token: undefined,
  initials: undefined,
};

export interface UserState {
  isSignedIn: boolean;
  email?: string;
  token?: string;
  initials?: string;
}

export interface LoginInterface {
  username?: string;
  password?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isSignedIn = true;
    },
    loginSuccess: (_, { payload }) => {
      saveState(userKey, payload)
      return {
        ...payload,
        isFetching: false,
      };
    },
    loginFailed: (state) => {
      state.isSignedIn = false;
    },
    logout: () => {
      deleteState(userKey);
      return initialState;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } = userSlice.actions;

