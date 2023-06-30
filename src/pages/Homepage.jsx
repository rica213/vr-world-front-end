import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../redux/features/StudioSlice';
import '../styles/hompage.css';
import Couresel from '../components/Couresel';

const Homepage = () => {
  const { studios } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudios());
  }, []);

  return (
    <main className="main-container">
      <section className="homepage-section">
        <h2>Available Studios </h2>
        <h5>please select a studio</h5>
        <Couresel studios={studios} />
      </section>
    </main>
  );
};

export default Homepage;
