/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import Slider from 'react-slick';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import StudioCard from './StudioCard';

const Couresel = ({ studios }) => {
  const sliderRef = useRef(null);

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const settings = {
    dots: false, // Show pagination dots
    arrows: false,
    centerMode: true,
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed in milliseconds
    // eslint-disable-next-line max-len, no-nested-ternary
    slidesToShow: studios.length > 1 ? (studios.length > 2 ? 3 : 2) : 1, // Number of items to show at a time
    slidesToScroll: 1, // Number of items to scroll at a time
    responsive: [
      {
        breakpoint: 900, // Adjust settings for smaller screens
        settings: {
          slidesToShow: studios.length > 1 ? 2 : 1,
        },
      },
      {
        breakpoint: 660, // Adjust settings for mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="couresel-container">
      <button className="arrow-btn prev" type="button" onClick={previousSlide}>
        <BiSolidLeftArrow />
      </button>
      <button className="arrow-btn next" type="button" onClick={nextSlide}>
        <BiSolidRightArrow />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {/*  eslint-disable-next-line react/prop-types */}
        {studios.map((studio) => (
          <StudioCard key={studio.id} details={studio} />
        ))}
      </Slider>
    </div>
  );
};
Couresel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  studios: PropTypes.array.isRequired,
};
export default Couresel;
