import React from 'react'
import styled from 'styled-components';

const PlayLoading = () => {
  return (
      <Loading/>
  )
}

export default PlayLoading


export const Loading = styled.div`
    display: inline-block;
    margin: 0 2rem 0 0;

  &:after {
    content: "";
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid var(--ec-main-color);
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