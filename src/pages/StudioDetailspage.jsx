import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudio } from "../redux/features/StudioSlice";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import "../styles/Studiodetailspage.css";

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

  console.log(studio);
  return (
    <>
      <div className="container">
        <div className="item"></div>
        <div className="item image-contain">
          <img src={studio?.image_url} className="studio-image" />
        </div>

        <div className="item details-section">
          <h1>{studio.name}</h1>
          <p>{studio.description}</p>
          <div className="studio-price">
            <p>Price per session</p>
            <p>${studio.price}</p>
          </div>
          <p className="text">Enjoyment Time</p>
          <div className="studio-price">
            <p>Duration per session</p>
            <p>{studio.duration}hrs</p>
          </div>

          <div className="rating">
            <p className="text">Rating</p>
            <div className="stars">
              <MultipliedStars times={studio.rating} />
            </div>
          </div>
          <div>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Studiodetails;
