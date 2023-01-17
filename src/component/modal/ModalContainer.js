import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { modalSelector } from "../../redux/slice/modalSlice";
import SignUpModal from "../sign/SignUpModal";
import SignInModal from "../sign/SignInModal";

const MODAL_COMPONENTS = {
  signIn: SignInModal,
  signUp: SignUpModal,
};

const ModalContainer = () => {
  const modalList = useSelector(modalSelector);
  // 모듈에 있는 modalSelector을 modalList안에 넣어준다
  const renderModal = modalList?.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent key={type} {...props} />;
  });
  return createPortal(<>{renderModal}</>, document.getElementById("modal"));
};
export default ModalContainer;
