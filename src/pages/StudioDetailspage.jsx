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
        <div className="item">{studio?.id}</div>
        <div className="item">{studio?.description}</div>
        <div className="item">{studio?.price}</div>
      </div>
    </>
  );
};

export default Studiodetails;
