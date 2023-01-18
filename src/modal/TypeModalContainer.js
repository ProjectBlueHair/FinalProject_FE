import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { typeModalSelector } from "./typeModalSlice";
import AlarmModal from "./alarm/AlarmModal";
const MODAL_COMPONENTS = {
  alarm: AlarmModal,
};

function TypeModalContainer() {
  const modalList = useSelector(typeModalSelector);
  console.log("modalList", modalList);

  const renderModal = modalList.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent key={type} {...props} />;
  });

  return createPortal(<>{renderModal}</>, document.getElementById("modal"));
}

export default TypeModalContainer;
