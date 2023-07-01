import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudio } from "../redux/features/StudioSlice";
import { useParams } from "react-router-dom";
import "../styles/Studiodetailspage.css";

const Studiodetails = () => {
  const studio = useSelector((state) => state.studios.studio);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(fetchStudio(id));
  }, [dispatch]);

  console.log(studio);
  return (
    <>
      <div className="container">
        <div className="item"></div>
        <div className="item image-contain">
          <img src={studio?.image_url} className="studio-image"/>
        </div>
        <div className="item details-section">
          <h1>{studio.name}</h1>
          <p>{studio.description}</p>
          <div className="studio-price">
            <p>price</p>
            <p>{studio.price}</p>
          </div>
          <p>Enjoyment Time</p>
        </div>
      </div>
    </>
  );
};

export default Studiodetails;
