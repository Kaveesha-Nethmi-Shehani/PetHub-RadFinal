import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import petReducer from '../features/petSlice';
import appointmentReducer from '../features/appointmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    appointments: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;