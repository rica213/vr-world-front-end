import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../helpers/localStorage';

const baseUrl = 'http://localhost:3000/users';
const initialState = {
  token: getLocalStorage('token') || null,
  user: getLocalStorage('token') || null,
  tempUser: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  isLoading: false,
  errors: null,
};

export const logInUser = createAsyncThunk(
  'auth/login',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/sign_in`, userInput);
      // eslint-disable-next-line dot-notation
      const tempToken = response.headers.getAuthorization(/Bearer /)['input'];
      response.data.tempToken = tempToken;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  },
);
export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseUrl}/sign_out`, {
        headers: {
          authorization: thunkAPI.getState().auth.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  },
);
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(baseUrl, userInput);

      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        return thunkAPI.rejectWithValue('username and email must be unique');
      }
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  },
);
const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleUpdate: (state, { payload: { name, value } }) => {
      const tempUser = { ...state.tempUser, [name]: value };
      return { ...state, tempUser };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        setLocalStorage('token', payload.tempToken);
        setLocalStorage('user', payload.status.data);
        return {
          ...state,
          token: payload.tempToken,
          user: payload.status.data,
          isLoading: false,
        };
      })
      .addCase(logInUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        errors: payload,
      }));
    builder
      .addCase(logOutUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logOutUser.fulfilled, (state) => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        return {
          ...state,
          isLoading: false,
          token: null,
          user: null,
        };
      })
      .addCase(logOutUser.rejected, (state) => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        return {
          ...state,
          isLoading: false,
          token: null,
          user: null,
        };
      });
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(registerUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        errors: payload,
      }));
  },
});
export const { handleUpdate } = authSlice.actions;
export default authSlice.reducer;
