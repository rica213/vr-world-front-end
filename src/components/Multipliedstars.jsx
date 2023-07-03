import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';

const MultipliedStars = ({ times }) => {
  const stars = Array.from({ length: times }, (_, index) => (
    <AiFillStar key={index} />
  ));

  return <div>{stars}</div>;
};

MultipliedStars.propTypes = {
  times: PropTypes.number.isRequired,
};

export default MultipliedStars;
