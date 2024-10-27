import { Payload } from "@/types/types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  name: string | null;
  uid: string | null | undefined;
  email: string | null;
}

const initialUserState: UserState = {
  name: null,
  uid: undefined,
  email: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    signin: (state, action: PayloadAction<Payload>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    signout: (state) => {
      state.name = null;
      state.uid = null;
      state.email = null;
    },
  },
});

export const { signin, signout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
