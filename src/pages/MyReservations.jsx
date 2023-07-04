import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/features/ReservationSlice';
import { fetchStudios } from '../redux/features/StudioSlice';
import '../styles/MyReservations.css';

const MyReservations = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.reservations.reservations);
  const isAdmin = useSelector(
    (state) => state.auth.user !== null && state.auth.user.admin === true
  );

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
                <div
                  className="res-stud-box"
                  style={{
                    backgroundImage: `url(${studio?.image_url})`, backgroundPosition: '0px', backgroundSize: '200%', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '150px', position: 'relative', top: '0', left: '0', zIndex: '0', opacity: '0.09',
                  }}
                />

                <div className="res-description">
                  <h3>{studio?.name}</h3>
                  <p>{reservation.reservation_date}</p>
                  <p>{reservation.location}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )) || <h4 className="no-reservation"> No Reservation Yet</h4>}
    </main>
  );
};

export default MyReservations;
