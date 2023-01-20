import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookies } from "../../dataManager/cookie";
import {
  __getDetailCollabo,
  __putDetailFollow,
} from "../../redux/slice/detailSlice";

const DetailFollow = ({ detailCollabo }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const acToken = getCookies("accesstoken");
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
            <FollowImgText>
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
            </FollowImgText>
            <FollowBtn>
              {acToken === undefined ? (
                ""
              ) : (
                <button onClick={() => FollowClick(collabo)}>
                  {collabo?.isFollowed ? "팔로우 취소" : "팔로우"}
                </button>
              )}
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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FollowTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 5px;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 80%;
  }
`;

const FollowMiddle = styled.div`
  display: flex;
  flex-direction: column;
`;
const FollowImgText = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowWriteInstrument = styled.div`
  margin-top: 0.3rem;
  display: flex;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    width: 10rem;
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
