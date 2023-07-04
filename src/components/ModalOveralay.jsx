import { useSelector } from 'react-redux';
import ConfirmationComponet from './ConfirmationComponet';

const ModalOveralay = () => {
  const { isModalOpen } = useSelector((state) => state.studios);
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <ConfirmationComponet />
    </div>
  );
};
export default ModalOveralay;
