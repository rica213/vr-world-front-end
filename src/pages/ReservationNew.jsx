import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import '../styles/ReservationNew.css';

const ReservationNew = () => {
//   const dispatch = useDispatch;
  const [city, setCity] = useState('');
  const [date, setDate] = useState(Date.now());

  return (
    <div className="page-wrapper">
      <h2>BOOK AN EXPERIENCE</h2>
      <div className="description">
        <p>
          Choose from over 8 incredible VR studios and unlock a world of limitless possibilities.
          Dive into undersea adventures, conquer shooting ranges,
          and explore immersive virtual worlds like never before.
          Book now and experience the best of VR.
        </p>
      </div>
      <div className="form-box">
        <form action="submit" className="form">
          <input type="text" className="city" placeholder="city" value={city} onChange={(e) => setCity(e.target.value)} name="city" />
          <input type="date" className="date" onChange={(e) => setDate(e.target.value)} value={date} name="date" />
          <input type="hidden" className="studio" />
          <input type="hidden" className="username" />
          <button type="submit" className="submit-btn">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationNew;
