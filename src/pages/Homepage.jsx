import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../redux/features/StudioSlice';
import '../styles/hompage.css';
import Couresel from '../components/Couresel';
import Loading from '../components/Loading';

const Homepage = () => {
  const { studios, isLoading } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudios());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main className="main-container">
        <Loading />
      </main>
    );
  }

  return (
    <main className="main-container">
      <section className="homepage-section">
        <h2>Available Studios </h2>
        <h4>please select a studio</h4>
        <Couresel studios={studios} />
      </section>
    </main>
  );
};

export default Homepage;
