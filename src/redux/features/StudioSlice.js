import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  studios: [],
  studio: [],
  status: 'idle',
  error: null,
  isSuccessful: false,
};

// fetching studios

export const fetchStudios = createAsyncThunk(
  'studios/fetchStudios',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/studios');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// create a new studio

export const createStudio = createAsyncThunk(
  'studio/createStudio',
  async (studioDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/studios',
        studioDetails,
        {
          headers: {
            authorization: thunkAPI.getState().auth.token,
          },
        },
      );
      thunkAPI.dispatch(fetchStudios);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

// delete an existing studio

export const deleteStudio = createAsyncThunk(
  'studio/deleteStudio',
  async (studioId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/studios/${studioId}`,
        {
          headers: {
            authorization: thunkAPI.getState().auth.token,
          },
        },
      );
      thunkAPI.dispatch(fetchStudios());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// fetching studio

export const fetchStudio = createAsyncThunk(
  'studio/fetchStudio',
  async (studioId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/studios/${studioId}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
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
      isSuccessful: false,
    }));
    builder.addCase(createStudio.fulfilled, (state) => ({
      ...state,
      status: 'successful',
      isSuccessful: true,
    }));
    builder.addCase(createStudio.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
      isSuccessful: false,
    }));

    // delete a specific studio

    builder.addCase(deleteStudio.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(deleteStudio.fulfilled, (state) => ({
      ...state,
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
      studio: action.payload,
    }));
    builder.addCase(fetchStudio.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
    }));
  },
});

export default studioSlice.reducer;
