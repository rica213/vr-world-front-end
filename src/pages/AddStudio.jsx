import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStudio, setSuccessful } from '../redux/features/StudioSlice';

const AddStudio = () => {
  const { error, isSuccessful } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studioDetails, setStudioDetails] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    working_hours: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudioDetails({ ...studioDetails, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(createStudio(studioDetails));
  };
  useEffect(() => {
    if (isSuccessful) {
      setStudioDetails({
        name: '',
        description: '',
        price: '',
        duration: '',
        location: '',
        working_hours: '',
        image_url: '',
      });

      navigate('/home');
      dispatch(setSuccessful());
    }
  }, [isSuccessful, dispatch, navigate]);

  return (
    <div className="page-wrapper">
      <h2>Add Studio</h2>
      <div className="description">
        <p>Hey Admin, make us proud. Add details of that amazing VR Studio.</p>
        <p>{error && `Submission ${error}. Please try again.`}</p>
      </div>
      <div className="form-box">
        <form action="submt" className="form" onSubmit={(e) => handleUpdate(e)}>
          <input
            type="text"
            className="city"
            placeholder="Studio name"
            onChange={(e) => handleChange(e)}
            value={studioDetails.name}
            name="name"
            required
          />
          <textarea
            className="city"
            placeholder="Description"
            name="description"
            onChange={(e) => handleChange(e)}
            value={studioDetails.description}
            required
          />
          <input
            type="number"
            className="city"
            placeholder="Price"
            name="price"
            onChange={(e) => handleChange(e)}
            value={studioDetails.price}
            required
          />
          <input
            type="number"
            className="city"
            placeholder="Duration per session"
            name="duration"
            onChange={(e) => handleChange(e)}
            value={studioDetails.duration}
            required
          />
          <input
            type="text"
            className="city"
            placeholder="Location"
            name="location"
            onChange={(e) => handleChange(e)}
            value={studioDetails.location}
            required
          />
          <input
            type="text"
            className="city"
            placeholder="Working Hours"
            name="working_hours"
            onChange={(e) => handleChange(e)}
            value={studioDetails.working_hours}
            required
          />
          <input
            type="text"
            className="city"
            placeholder="Image URL"
            name="image_url"
            onChange={(e) => handleChange(e)}
            value={studioDetails.image_url}
            required
          />
          <button type="submit" className="submit-bttn">
            Add Studio
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudio;
