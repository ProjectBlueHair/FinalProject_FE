import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import DetailFollow from "./DetailFollow";
import DetailComment from "./detailcomment/DetailComment";

const DetailDayAndFollow = () => {
  const [upDown, setUpDown] = useState(false);

  const onUpDown = () => {
    setUpDown(!upDown);
  };

  return (
    <DetailLeftLine>
      <div>2023-01-11</div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis deserunt
        ea laborum tempora officiis suscipit dicta necessitatibus assumenda
        dolorem, cupiditate itaque voluptatum omnis, quo explicabo hic voluptate
        maxime, voluptas obcaecati.
      </div>
      <FollowMore>
        <button onClick={onUpDown}>
          {upDown ? <AiOutlineDown /> : <AiOutlineUp />}
        </button>
      </FollowMore>
      {upDown ? <DetailFollow /> : ""}
      <hr style={{ border: "1px solid rgba(0,0,0,0.2)" }} />
      <DetailComment />
    </DetailLeftLine>
  );
};

export default DetailDayAndFollow;

const DetailLeftLine = styled.div`
  width: 85rem;
  /* border: 1px solid black; */
  margin-right: 1rem;
  div {
    margin-bottom: 1rem;
  }
`;

const FollowMore = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0;
  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.35);
    font-size: 0px;
    line-height: 0px;
  }
  button {
    border: transparent;
    background-color: transparent;
    margin: 0 10px;
  }
`;
