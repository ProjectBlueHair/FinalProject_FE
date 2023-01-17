import React from "react";
import styled from "styled-components";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";

const DetailCommentSub = () => {
  return (
    <DetailComSubTotal>
      <DetailComTopSubImg />
      <DetailComSubTop>
        <DetailComSubHeader>
          <div>작성자</div>
          <button>
            <Img wd="2.5rem" src={more} />
          </button>
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            quidem! Facilis at dolore ipsam ex aliquid numquam architecto
            suscipit veritatis est quaerat, repudiandae delectus corrupti enim
            quibusdam voluptatum quos! Quo!
          </div>
          <div>좋아요</div>
        </DetailComSubContent>
      </DetailComSubTop>
    </DetailComSubTotal>
  );
};
export default DetailCommentSub;

const DetailComSubTotal = styled.div`
  display: flex;
`;

const DetailComTopSubImg = styled.img`
  min-width: 3.5rem;
  height: 3.5rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

const DetailComSubTop = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 77rem;
`;

const DetailComSubHeader = styled.div`
  display: flex;
  div {
    width: 73rem;
    margin-top: 1rem;
  }
  button {
    border: transparent;
    background-color: transparent;
  }
`;

const DetailComSubContent = styled.div`
  width: 70rem;
  margin-top: -10px;
`;
