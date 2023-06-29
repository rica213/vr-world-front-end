import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const navSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleNav: (state) => ({ ...state, isOpen: !state.isOpen }),
  },
});
export const { toggleNav } = navSlice.actions;
export default navSlice.reducer;
