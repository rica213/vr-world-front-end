/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { CgMail } from 'react-icons/cg';
import PropTypes from 'prop-types';

const StudioCard = ({
  details: { name, image_url: imageUrl, description },
}) => {
  const [color, setcolor] = useState('#5353538D');
  function generateRandomHexColor() {
    const characters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      color += characters[randomIndex];
    }

    // Adding opacity
    color += Math.floor(Math.random() * 16).toString(16);
    color += Math.floor(Math.random() * 16).toString(16);

    return color;
  }
  useEffect(() => {
    setcolor(generateRandomHexColor());
  }, []);

  return (
    <article className="studio-card">
      <div className="studio-card-header">
        <div className="circle-color" style={{ backgroundColor: `${color}` }}>
          <img src={imageUrl} alt={name} className="circle-img" />
        </div>
      </div>
      <div className="studio-card-body">
        <h3>{name}</h3>
        <p className="dots">....................</p>
        <p>{description}</p>
      </div>
      <div className="studio-card-footer">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <AiFillTwitterCircle />
        </a>
        <a href="www.google.com" target="_blank">
          <CgMail />
        </a>
      </div>
    </article>
  );
};
StudioCard.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
export default StudioCard;