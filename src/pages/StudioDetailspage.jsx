import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { fetchStudio } from '../redux/features/StudioSlice';
import '../styles/Studiodetailspage.css';

const Studiodetails = () => {
  const studio = useSelector((state) => state.studios.studio);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchStudio(id));
  }, [dispatch]);

  const MultipliedStars = ({ times }) => {
    const stars = Array.from({ length: times }, (_, index) => (
      <AiFillStar key={index} />
    ));

    return <div>{stars}</div>;
  };

  return (
    <>
      <div className="container">
        <div className="item" />
        <div className="item image-contain">
          <img src={studio?.image_url} className="studio-image" alt="studio icon" />
        </div>

        <div className="item details-section">
          <h1>{studio.name}</h1>
          <p>{studio.description}</p>
          <div className="studio-price">
            <p className="text-tag">Price</p>
            <p>
              $
              {studio.price}
            </p>
          </div>
          <p className="text">Enjoyment Time</p>
          <div className="studio-price">
            <p className="text-tag">Session</p>
            <p>
              {studio.duration}
              hrs
            </p>
          </div>

          <div className="rating">
            <p className="text ratng-text">Rating</p>
            <div className="stars">
              <MultipliedStars times={studio.rating} />
            </div>
          </div>

          <div>
            <div className="loader" />
          </div>

          <Link to="/reservations">
            <button type="button" className="reserve-btn">Reserve </button>
          </Link>
        </div>
      </div>
    </>
  );
};

Studiodetails.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
     
  }).isRequired,
};

export default Studiodetails;
