import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import filterReducer from '../redux/features/auth/filterSlice';
import formReducer from './features/form/formSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    form: formReducer,
  },
});
