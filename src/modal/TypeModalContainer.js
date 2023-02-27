import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { typeModalSelector } from "./typeModalSlice";
import AlarmModal from "./modals/AlarmModal";
import LoadingModal from "./modals/LoadingModal";
import AlertModal from "./modals/AlertModal";
import FeedBack from "./modals/FeedBack";
import ThankYou from "./modals/ThankYou";
import SearchModal from "./modals/SearchModal";
const MODAL_COMPONENTS = {
  alarm: AlarmModal,
  loading: LoadingModal,
  alert: AlertModal,
  feedback: FeedBack,
  thank: ThankYou,
  search: SearchModal,
};

function TypeModalContainer() {
  const modalList = useSelector(typeModalSelector);
  const renderModal = modalList.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent key={type} {...props} />;
  });

  return createPortal(<>{renderModal}</>, document.getElementById("modal"));
}

export default TypeModalContainer;
