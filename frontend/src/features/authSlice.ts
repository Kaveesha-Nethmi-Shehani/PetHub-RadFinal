import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../api/axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string; role: string; phone: string }, thunkAPI) => {
    try {
      const response = await API.post('/auth/register', userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login'