import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../api/axios';
import { Pet } from '../types';

interface PetState {
  pets: Pet[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: PetState = {
  pets: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const fetchPets = createAsyncThunk('pets/fetchPets', async (_, thunkAPI) => {
  try {
    const response = await API.get('/pets');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addPet = createAsyncThunk(
  'pets/addPet',
  async (petData: Omit<Pet, '_id' | 'owner' | 'createdAt'>, thunkAPI) => {
    try {
      const response = await API.post('/pets', petData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWi