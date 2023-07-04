import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import '../styles/ReservationNew.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../redux/features/ReservationSlice';

const ReservationNew = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState(Date.now());
  const { studioId } = useParams();
  const { isLoading, isSuccessfull } = useSelector(
    (state) => state.reservations,
  );
  const dispatch = useDispatch();
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
    }
  }, [isSuccessfull, navigate]);

  return (
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
  );
};

export default ReservationNew;
