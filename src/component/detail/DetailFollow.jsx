import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  __getDetailCollabo,
  __putDetailFollow,
} from "../../redux/slice/detailSlice";

const DetailFollow = ({ detailCollabo }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(detailCollabo);
  const FollowClick = async (fol) => {
    const follow = {
      isFollowed: fol.isFollowed,
      myFollowingMemberNickname: fol.nickname,
    };
    await dispatch(__putDetailFollow(follow));
    dispatch(__getDetailCollabo(id));
  };
  return (
    <>
      {detailCollabo?.map((collabo, index) => (
        <FollowTotal key={index}>
          <FollowTop>
            <img src={collabo.profileImg} alt="" />
            <FollowMiddle>
              <FollowWriteInstrument>
                {collabo?.musicPartsList?.map((part, index) => (
                  <div key={index}>{part}</div>
                ))}

                <span>{collabo.nickname}</span>
              </FollowWriteInstrument>
              <div style={{ fontSize: "12px" }}>
                팔로워 {collabo.followerCount} 명
              </div>
            </FollowMiddle>
            <FollowBtn>
              <button onClick={() => FollowClick(collabo)}>
                {collabo?.isFollowed ? "팔로우 취소" : "팔로우"}
              </button>
            </FollowBtn>
          </FollowTop>
          <FollowTitle>연주 설명부분</FollowTitle>
        </FollowTotal>
      ))}
    </>
  );
};

export default DetailFollow;

const FollowTotal = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;
`;

const FollowTop = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  img {
    width: 5rem;
    height: 4rem;
    border: 1px solid black;
    border-radius: 80%;
  }
`;

const FollowMiddle = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowWriteInstrument = styled.div`
  margin-top: 0.3rem;
  display: flex;
  width: 20rem;
  height: 1.5rem;
  div {
    border: transparent;
    height: 2rem;
    margin-right: 1rem;
    padding: 3px 5px;
    border-radius: 20px;
    background-color: #ff4d00;
    font-size: 1rem;
    color: white;
  }
  span {
    padding: 1px 0;
  }
`;

const FollowBtn = styled.div`
  width: 65rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    width: 8rem;
    height: 3.5rem;
    font-size: 1.5rem;
    background-color: transparent;
    border: 2px solid #ff4d00;
    border-radius: 20px;
  }
`;

const FollowTitle = styled.div`
  margin-top: -15px;
`;
