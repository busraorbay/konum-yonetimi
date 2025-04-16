import { configureStore } from "@reduxjs/toolkit";
import markerReducer from "./markerSlice";

export const store = configureStore({
  reducer: {
    marker: markerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
