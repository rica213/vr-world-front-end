import axios from 'axios';
import { createAsyncthunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  studios: [],
  status: 'idle',
  error: null,
};

// fetching studios

const fetchStudios = createAsyncthunk('studios/fetchStudios', async () => {
  const response = await axios.get('http://localhost:3000/api/v1/studios');
  return response.data;
});

const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudios.pending, (state) => ({
      ...state,
      status: 'Loading',
    }));
    builder.addCase(fetchStudios.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      studios: action.payload,
    }));
    builder.addCase(fetchStudios.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }));
  },
});

// fetching studio

const fetchStudio = createAsyncthunk('studio/fetchStudio', async (studioId) => {
  const response = await axios.get(`http://localhost:3000/api/v1/studios/${studioId}`);
  return response.data;
});

const studioSlice = createSlice({
  name: 'studio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudio.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchStudio.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      studios: action.payload,
    }));
    builder.addCase(fetchStudio.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }));
  },

});

export const studiosSliceReducer = studiosSlice.reducer;
export const studioSliceReducer = studioSlice.reducer;
