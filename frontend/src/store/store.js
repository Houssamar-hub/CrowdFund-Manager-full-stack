import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';  // ← نزيدو هاد

export const store = configureStore({
  reducer: {
    auth: authReducer,  // ← نزيدو هاد
  },
});