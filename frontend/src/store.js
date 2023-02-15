import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: userReducer,
  },
});
