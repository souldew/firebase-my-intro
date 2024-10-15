import { configureStore, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: string | undefined;
  credential: string | undefined;
}

const initialUserState: UserState = {
  user: undefined,
  credential: undefined,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
  },
});

export const { setCredential } = userSlice.actions;

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
