<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
});
=======
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';  // ← نزيدو هاد

export const store = configureStore({
  reducer: {
    auth: authReducer,  // ← نزيدو هاد
  },
});
>>>>>>> f007301275f37080fbfbd8fc8073737b29d81c58
