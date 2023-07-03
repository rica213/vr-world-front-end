import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/features/ReservationSlice';
import { fetchStudios } from '../redux/features/StudioSlice';
import '../styles/MyReservations.css';

const MyReservations = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchStudios());
  }, [dispatch]);
  const studios = useSelector((state) => state.studios.studios);
  const getRandomColor = (index) => {
    const colors = [
      '#0079FF',
      '#00DFA2',
      '#b9bd28',
      '#FF0060',
      '#98DFD6',
      '#77D970',
    ];
    const randomColor = colors[index % colors.length];
    return randomColor;
  };

  return (
    <main>
      <h1 className="reservation-title">My Reservations</h1>
      {(reservations.length > 0 && (
        <ul className="reservation-list">
          {reservations.map((reservation, index) => {
            const studio = studios.find(
              (studio) => studio.id === reservation.studio_id,
            );
            const reservationStyle = {
              backgroundColor: getRandomColor(index),
            };

            return (
              <li
                key={reservation.id}
                className="reservation-card"
                style={reservationStyle}
              >
                <h3>{studio.name}</h3>
                <p>{reservation.reservation_date}</p>
                <p>{reservation.location}</p>
              </li>
            );
          })}
        </ul>
      )) || <h4 className="no-reservation"> No Reservation Yet</h4>}
    </main>
  );
};

export default MyReservations;
