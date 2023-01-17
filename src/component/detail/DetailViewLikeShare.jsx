import React, { useState } from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { view, like, save, share } from "../../asset/pic";
import { AiFillHeart } from "react-icons/ai";

const DetailViewLikeShare = () => {
  const [lickClick, setLikeClick] = useState(false);
  const onLickClick = () => {
    setLikeClick(!lickClick);
  };
  return (
    <DetailLikeShareLine>
      <div>
        <Img wd="2.5rem" src={view} />
        <div>1</div>
      </div>
      <div>
        <button onClick={onLickClick}>
          {lickClick ? (
            // 임시로 like 쪽 색상 변경 불가능 해서
            <AiFillHeart style={{ fontSize: "2.3rem", color: "red" }} />
          ) : (
            <Img wd="2rem" src={like} />
          )}
        </button>
        <div>1</div>
      </div>
      <div>
        <Img wd="3.5rem" src={save} />
        <div>보관함 추가</div>
      </div>
      <div>
        <Img wd="3.5rem" src={share} />
        <div>공유</div>
      </div>
    </DetailLikeShareLine>
  );
};

export default DetailViewLikeShare;

const DetailLikeShareLine = styled.div`
  display: flex;
  margin: 20px auto 0;
  justify-content: flex-start;
  width: 120rem;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin: 0 2rem 0 1rem;
  }
  button {
    border: transparent;
    background-color: transparent;
  }
`;
