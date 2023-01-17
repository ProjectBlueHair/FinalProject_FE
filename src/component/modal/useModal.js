import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slice/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }) => {
    dispatch(openModal({ type, props }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};
export default useModal;
