/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { closeModal } from '../redux/features/StudioSlice';
import '../styles/ReservationNew.css';
import {
  createReservation,
  resetSuccessful,
} from '../redux/features/ReservationSlice';

const CreateReservation = ({ studioId }) => {
  const { isModalOpen } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [date, setDate] = useState(Date.now());

  const { isLoading, isSuccessfull } = useSelector(
    (state) => state.reservations,
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !date) return;
    const details = { location: city, reservation_date: date };
    dispatch(createReservation({ studioId, details }));
  };
  React.useEffect(() => {
    if (isSuccessfull) {
      setCity('');
      setDate(Date.now());
      navigate('/reservations/my-reservations');
      dispatch(resetSuccessful());
      dispatch(closeModal());
    }
  }, [dispatch, isSuccessfull, navigate]);
  const handleModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      dispatch(closeModal());
    }
  };
  return (
    <div
      className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}
      aria-modal="true"
      onClick={handleModal}
    >
      <div className="page-wrapper">
        <h2>BOOK AN EXPERIENCE</h2>
        <div className="description">
          <p>
            Choose from over 8 incredible VR studios and unlock a world of
            limitless possibilities. Dive into undersea adventures, conquer
            shooting ranges, and explore immersive virtual worlds like never
            before. Book now and experience the best of VR.
          </p>
        </div>
        <div className="form-box">
          <form action="submit" className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="city"
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
              required
            />
            <input
              type="date"
              className="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
            />
            <button type="submit" className="submit-bttn" disabled={isLoading}>
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateReservation;
CreateReservation.propTypes = {
  studioId: PropTypes.number.isRequired,
};
