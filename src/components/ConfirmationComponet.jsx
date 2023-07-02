import { useDispatch, useSelector } from 'react-redux';
import { closeModal, deleteStudio } from '../redux/features/StudioSlice';

const ConfirmationComponet = () => {
  const { flagId } = useSelector((state) => state.studios);
  const dispatch = useDispatch();
  const removeStudio = () => {
    dispatch(deleteStudio(flagId));
    dispatch(closeModal());
  };
  return (
    <div className="confirm-container">
      <h3 className="text-center">Are you sure?</h3>
      <div className="confrim-btns-container">
        <button
          type="button"
          className="confirm-btn confirm"
          onClick={() => removeStudio()}
        >
          confrim
        </button>
        <button
          type="button"
          className="confirm-btn cancel"
          onClick={() => dispatch(closeModal())}
        >
          cancel
        </button>
      </div>
    </div>
  );
};
export default ConfirmationComponet;
