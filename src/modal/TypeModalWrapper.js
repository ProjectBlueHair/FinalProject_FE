// components/Modal/Modal

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useOutSideClick from "./hooks/useOutSideClick";
import useTypeModal from "./hooks/useTypeModal";
import { RiCloseFill } from "react-icons/ri";

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
  };

  const Wrapper = MODAL_WRAPPERS[type];

  return (
    
      <Wrapper ref={modalRef}>{children}</Wrapper>
  );
}
export default TypeModalWrapper;



const AlarmModalWrapper = styled.div`
  width: 32rem;
  height: 67%;
  border-radius: 10px;
  /* padding: 2rem 0 2rem 2rem; */

  background-color: #ffffff;
  border : 1px solid var(--ec-main-color);
  position: absolute;
  top: 16px;
  right:242px;
  z-index: 9999;
  /* transform: translate(-50%, -50%); */
`;

const AlertBugWrapper = styled.div`
  width: 32rem;
  height: 67%;
  border-radius: 10px;
  /* padding: 2rem 0 2rem 2rem; */

  background-color: #ffffff;
  border : 1px solid var(--ec-main-color);
  position: absolute;
  top: 16px;
  right:242px;
  /* transform: translate(-50%, -50%); */
`;
const AlertInfoWrapper = styled.div`
  width: 32rem;
  height: 67%;
  border-radius: 10px;
  /* padding: 2rem 0 2rem 2rem; */

  background-color: #ffffff;
  border : 1px solid var(--ec-main-color);
  position: absolute;
  top: 16px;
  right:242px;
  /* transform: translate(-50%, -50%); */
`;
