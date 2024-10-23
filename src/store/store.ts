import { Payload } from "@/types/types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  name: string | undefined;
  uid: string | undefined;
}

const initialUserState: UserState = {
  name: undefined,
  uid: undefined,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    signin: (state, action: PayloadAction<Payload>) => {
      state.uid = action.payload.uid;
    },
    signout: (state) => {
      state.name = undefined;
      state.uid = undefined;
    },
  },
});

export const { signin, signout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
