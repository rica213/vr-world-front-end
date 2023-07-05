import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../utils/urls';

// Fetch all existing reservations
export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservations',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/reservations`, {
        headers: {
          authorization: thunkAPI.getState().auth.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// Create a new reservation
export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async ({ studioId, details }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/studios/${studioId}/reservations`,
        details,
        {
          headers: {
            authorization: thunkAPI.getState().auth.token,
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// Delete an existing reservation
export const deleteReservation = createAsyncThunk(
  'reservation/deleteReservation',
  async ({ studioId, reservationId }, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/studios/${studioId}/reservations/${reservationId}`,
        {
          headers: {
            authorization: thunkAPI.getState().auth.token,
          },
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// Set the initial state
const initialState = {
  reservations: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

// Create slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetSuccessful: (state) => ({ ...state, isSuccessfull: false }),
  },
  extraReducers: (builder) => {
    // fetch all existing reservations
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        isLoading: false,
      }))
      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        error: action.payload.error,
        isLoading: false,
      }));

    // create a new reservation
    builder
      .addCase(createReservation.pending, (state) => ({
        ...state,
        isLoading: true,
        isSuccessfull: false,
      }))
      .addCase(createReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: [...state.reservations, action.payload],
        isLoading: false,
        isSuccessfull: true,
      }))
      .addCase(createReservation.rejected, (state, action) => ({
        ...state,
        error: action.payload.error,
        isLoading: false,
        isSuccessfull: false,
      }));

    // delete an existing reservation
    builder
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.payload.id,
        ),
        isLoading: false,
      }))
      .addCase(deleteReservation.rejected, (state, action) => ({
        ...state,
        error: action.payload.error,
        isLoading: false,
      }));
  },
});

export const { resetSuccessful } = reservationSlice.actions;
export default reservationSlice.reducer;
