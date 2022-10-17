import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/postSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
