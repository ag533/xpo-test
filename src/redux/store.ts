import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./brandSlice";

const store = configureStore({
  reducer: {
    brands: brandReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
