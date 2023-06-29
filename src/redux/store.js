import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/ReservationSlice';
import AuthenticationReducer from './features/AuthenticationSlice';
import navReducer from './features/NavbarSlice';
import studioReducer from './features/StudioSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    reservations: reservationReducer,
    nav: navReducer,
    studios: studioReducer,
  },
);

export default store;
