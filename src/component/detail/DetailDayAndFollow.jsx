import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import DetailFollow from "./DetailFollow";
import DetailComment from "./detailcomment/DetailComment";
import { __getDetailCollabo } from "../../redux/slice/detailSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const DetailDayAndFollow = ({ detail }) => {
  const [upDown, setUpDown] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const onUpDown = () => {
    setUpDown(!upDown);
  };

  useEffect(() => {
    dispatch(__getDetailCollabo(id));
  }, []);
  //작곡가 프로필/ 이름/ 악기 이름
  const detailCollabo = useSelector((state) => state.detail.collabo.data);
  return (
    <DetailLeftLine>
      <div>{detail?.createdAt}</div>
      <div>{detail?.contents}</div>
      <FollowMore>
        <button onClick={onUpDown}>
          {upDown ? <AiOutlineDown /> : <AiOutlineUp />}
        </button>
      </FollowMore>
      {upDown ? <DetailFollow detailCollabo={detailCollabo} /> : ""}
      <hr style={{ border: "1px solid rgba(0,0,0,0.2)" }} />
      <DetailComment />
    </DetailLeftLine>
  );
};

export default DetailDayAndFollow;

const DetailLeftLine = styled.div`
  width: 80rem;
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
