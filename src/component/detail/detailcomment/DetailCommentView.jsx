import React, { useState } from "react";
import styled from "styled-components";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import DetailCommentSub from "./DetailCommentSub";

const DetailCommentView = () => {
  const [comUpDown, setComUpDown] = useState(false);
  const onCommentUpDown = () => {
    setComUpDown(!comUpDown);
  };
  return (
    <DetailComTotal>
      <DetailComTopImg />
      <DetailComTop>
        <DetailComHeader>
          <div>작성자</div>
          <button>
            <Img wd="2.5rem" src={more} />
          </button>
        </DetailComHeader>
        <DetailComContent>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            quidem! Facilis at dolore ipsam ex aliquid numquam architecto
            suscipit veritatis est quaerat, repudiandae delectus corrupti enim
            quibusdam voluptatum quos! Quo!
          </div>
          <div>좋아요</div>
        </DetailComContent>

        <DetailComUpDown>
          {comUpDown ? <DetailCommentSub /> : ""}
          <div>
            <button onClick={onCommentUpDown}>
              {comUpDown ? (
                <span>
                  <AiOutlineUp /> 대댓글 닫기
                </span>
              ) : (
                <span>
                  <AiOutlineDown /> 대댓글 보기
                </span>
              )}
            </button>
          </div>
        </DetailComUpDown>
      </DetailComTop>
    </DetailComTotal>
  );
};

export default DetailCommentView;

const DetailComTotal = styled.div`
  display: flex;
`;

const DetailComTopImg = styled.img`
  min-width: 3.5rem;
  height: 3.5rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

const DetailComTop = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
`;

const DetailComHeader = styled.div`
  display: flex;
  div {
    width: 78rem;
    margin-top: 1rem;
  }
  button {
    border: transparent;
    background-color: transparent;
  }
`;

const DetailComUpDown = styled.div`
  button {
    margin-right: 1rem;
    background-color: transparent;
    border: transparent;
  }
`;

const DetailComContent = styled.div`
  width: 80rem;
  margin-top: -10px;
`;
