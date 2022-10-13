import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
