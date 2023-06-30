import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { deleteStudio } from '../redux/features/StudioSlice';

const SingleStudio = ({
  details: {
    id, image_url: imageUrl, name, description,
  },
}) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteStudio(id));
  return (
    <article className="single-studio-card">
      <div className="circle-color">
        <img src={imageUrl} alt={name} className="circle-img" />
      </div>
      <div className="studio-card-body">
        <h3>{name}</h3>
        <p className="dots">....................</p>
        <p>{description}</p>
      </div>
      <div className="delete-overlay">
        <button
          type="button"
          onClick={() => handleDelete(id)}
          className="del-studio-btn"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};
SingleStudio.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
export default SingleStudio;
