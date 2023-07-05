import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../redux/features/StudioSlice';
import SingleStudio from '../components/SingleStudio';
import '../styles/deleteStudios.css';
import ModalOveralay from '../components/ModalOveralay';

const RemoveStudios = () => {
  const { studios } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudios());
  }, [dispatch]);

  return (
    <section className="section-container">
      <h1 className="text-center">Delete Studios</h1>
      <div className="delete-studios-container">
        {studios.map((studio) => (
          <SingleStudio key={studio.id} details={studio} />
        ))}
      </div>
      <ModalOveralay />
    </section>
  );
};
export default RemoveStudios;
