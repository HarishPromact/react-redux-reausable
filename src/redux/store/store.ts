import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user/userSlice";
import counterSlice from "../slices/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
