import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface InitialStateAuth {
  user: User | null,
}

export const INITIAL_STATE: InitialStateAuth = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state: InitialStateAuth, action) => state.user = action.payload,
    clear: () => INITIAL_STATE,
  },
})

export default authSlice;