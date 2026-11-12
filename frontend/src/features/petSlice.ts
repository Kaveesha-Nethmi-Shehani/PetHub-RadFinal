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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePet = createAsyncThunk('pets/deletePet', async (id: string, thunkAPI) => {
  try {
    await API.delete(`/pets/${id}`);
    return id;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.isLoading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.pets.unshift(action.payload);
      })
      .addCase(deletePet.fulfilled, (state, action: PayloadAction<string>) => {
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      });
  },
});

export default petSlice.reducer;