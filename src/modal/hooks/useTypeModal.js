import { useDispatch } from "react-redux";
import { __openModal, __closeModal } from "../typeModalSlice";
function useTypeModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }) => {
    console.log('type',type)
    dispatch(__openModal({ type, props }));
  };

  const handleCloseModal = (type) => {
    dispatch(__closeModal());
  };

  return { $openModal: handleOpenModal, $closeModal: handleCloseModal };
}

export default useTypeModal;