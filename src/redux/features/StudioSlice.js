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

// create a new studio

const createStudio = createAsyncthunk(
  'studio/createStudio',
  async ({
    name,
    description,
    price,
    duration,
    location,
    workingHours,
    imageUrl,
    rating,
  }) => {
    const response = await axios.post('http://localhost:3000/api/v1/studios', {
      name,
      description,
      price,
      duration,
      location,
      workingHours,
      imageUrl,
      rating,
    });
    return response.data;
  },
);

// delete an existing studio

const deleteStudio = createAsyncthunk('studio/deleteStudio', async ({ studioId }) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/studios/${studioId}`);
  return response.data;
});

// fetching studio

const fetchStudio = createAsyncthunk(
  'studio/fetchStudio',
  async ({ studioId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/studios/${studioId}`,
    );
    return response.data;
  },
);

// studio slice

const studioSlice = createSlice({
  name: 'studio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all studios
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

    // create a new studio
    builder.addCase(createStudio.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(createStudio.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      studios: action.payload,
    }));
    builder.addCase(createStudio.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }));

    // delete a specific studio

    builder.addCase(deleteStudio.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(deleteStudio.fulfilled, (state, action) => ({
      ...state,
      studios: state.studios.filter((studio) => studio.id !== action.payload.id),
      status: 'successful',
    }));
    builder.addCase(deleteStudio.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }));

    // fetch a single studio
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

export default studioSlice.reducer;
