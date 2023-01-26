import React from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { like, view } from "../../asset/pic";

const MypageLeftBottom = () => {
  return (
    <LBDiv>
      <div>
        <LBImg />
      </div>
      <div>
        <div>제목</div>
        <div>해시태그들</div>
        <BottomRow>
          <button>
            <Img wd="1.5rem" src={view} />
            <div>count</div>
          </button>
          <button>
            <Img wd="1.3rem" src={like} />
            <div>count</div>
          </button>
        </BottomRow>
      </div>
    </LBDiv>
  );
};

export default MypageLeftBottom;

const LBDiv = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const LBImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 70%;
  border: 1px solid black;
  margin-right: 10px;
`;

const BottomRow = styled.div`
  display: flex;
  button {
    border: transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  div {
    margin: 0 5px;
  }
`;
