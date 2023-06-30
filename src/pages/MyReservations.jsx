import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/features/ReservationSlice';

const MyReservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations())
  }, [dispatch])

  const {reservations} = useSelector(state => state.reservation.reservations)
  
  return (
    <main>
      <h1>My Reservations</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            # TODO check on rails console the reservation.studio.name
            <p>{reservation.studio.name}</p>
            <p>{reservation.date}</p>
            <p>{reservation.location}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default MyReservations;