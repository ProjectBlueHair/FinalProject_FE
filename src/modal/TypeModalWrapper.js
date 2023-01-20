// components/Modal/Modal

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useOutSideClick from "./hooks/useOutSideClick";
import useTypeModal from "./hooks/useTypeModal";

function TypeModalWrapper({ children, type }) {
  const modalRef = useRef(null);

  const { $closeModal } = useTypeModal();
  useOutSideClick(modalRef, $closeModal);
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const MODAL_WRAPPERS = {
    alarm: AlarmModalWrapper,
    alert: AlertModal,
  };

  const Wrapper = MODAL_WRAPPERS[type];

  return (
    <Overlay>
      <Wrapper ref={modalRef}>{children}</Wrapper>
    </Overlay>
  );
}
export default TypeModalWrapper;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 19999;
`;

const AlarmModalWrapper = styled.div`
  width: 32rem;
  height: 67%;
  border-radius: 10px;
  /* padding: 2rem 0 2rem 2rem; */

  background-color: #ffffff;
  border: 1px solid var(--ec-main-color);
  position: absolute;
  top: 16px;
  right: 242px;
  z-index: 9999;
  /* transform: translate(-50%, -50%); */
`;

const AlertModal = styled.div`
  z-index: 5;
  width: 40rem;
  height: 55rem;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.18);
  transform: translate(-50%, -50%);
`;
