import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user/userSlice";
import counterSlice from "../slices/counter/counterSlice";

/**
 * This is the store that is used to store the state of the application
 */
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});

/**
 * This type is used to define the state of the store
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
