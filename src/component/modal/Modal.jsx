import React, { useRef } from "react";
import styled from "styled-components";
import useModal from "./useModal";

const Modal = ({ type, children }) => {
  const { closeModal } = useModal();
  const handleClose = () => {
    closeModal?.();
  };
  // 외부 클릭시 x또는 나가기 안눌러도 모달 나가지게 해줌
  const modalRef = useRef(null);

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <CloseButton onClick={handleClose}>
          <i>X</i>
        </CloseButton>
        <div>{children}</div>
        {/* 재사용을 위해 contents안에 children을 받아 렌더링 해줌! */}
      </ModalWrap>
    </Overlay>
  );
};
export default Modal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1500;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: 650px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  margin-top: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 20px;
  }
`;
