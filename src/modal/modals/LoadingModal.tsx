import React from 'react'
import styled from 'styled-components';

const LoadingModal = () => {
  return (
    <Overlay>
      <Loading/>
    </Overlay>
  )
}

export default LoadingModal
const Overlay = styled.div`
  position: fixed;
  top: 50%;
  padding: 2.5rem;
  left: 50%;
  z-index: 100000;
  border-radius:10px;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.5);
`;

export const Loading = styled.div`
    display: inline-block;
    margin: auto;
    /* width: 80px;
    height: 80px; */

  &:after {
    content: "";
    display: block;
    width: 53px;
    height: 53px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--ec-main-color);
    border-color: var(--ec-main-color) transparent var(--ec-main-color)
      transparent;
    animation: lds-dual-ring 0.6s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;