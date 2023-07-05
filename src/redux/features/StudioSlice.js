import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseUrl from '../../utils/urls';

const initialState = {
  studios: [],
  studio: [],
  status: 'idle',
  error: null,
  flagId: null,
  isModalOpen: false,
  isSuccessful: false,
};

// fetching studios

export const fetchStudios = createAsyncThunk(
  'studios/fetchStudios',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/studios`);
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
        `${baseUrl}/api/v1/studios`,
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
        `${baseUrl}/api/v1/studios/${studioId}`,
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
      const response = await axios.get(`${baseUrl}/api/v1/studios/${studioId}`);
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
  reducers: {
    setFlagId: (state, { payload }) => ({ ...state, flagId: payload }),
    closeModal: (state) => ({ ...state, isModalOpen: false }),
    openModal: (state) => ({ ...state, isModalOpen: true }),
    setSuccessful: (state) => ({ ...state, isSuccessful: false }),
  },
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
      flagId: null,
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

export const {
  setFlagId, openModal, closeModal, setSuccessful,
} = studioSlice.actions;
export default studioSlice.reducer;
