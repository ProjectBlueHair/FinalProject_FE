import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import {
  facebook,
  insta,
  like,
  linkedIn,
  twitter,
  view,
} from "../../asset/pic";
import MypageLeftBottom from "./MypageLeftBottom";
import { instanceAxios } from "../../dataManager/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MypageLeft = () => {
  const { nickname } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myShare, setMyShare] = useState(false);
  const mySetInformation = async () => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get(`member/mypage/${nickname}`);
      console.log("2", data);
      setInformation(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    mySetInformation();
  }, []);
  const [information, setInformation] = useState();
  console.log("2", information);

  const mypageFollow = () => {};
  return (
    <LeftTotalDiv>
      <MypageLeftDiv>
        <MypageProfile src={information?.profileImg} />
        <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
          {information?.nickname}
        </h1>
        <RowView>
          {information?.jobList.map((job, index) => (
            <span key={index}>{job}</span>
          ))}
        </RowView>
        {information?.isMine ? (
          <>
            <MypageBtn onClick={() => navigate("/setpage")}>
              프로필 편집
            </MypageBtn>
          </>
        ) : (
          <>
            <MypageBtn onClick={mypageFollow}>팔로우</MypageBtn>
            <MypageBtn>다이렉트 메세지</MypageBtn>
          </>
        )}
        <MypageBtn onClick={() => setMyShare(!myShare)}>
          <div>공유</div>
          {myShare ? <MypageShare>5개 링크 들어갈곳</MypageShare> : ""}
        </MypageBtn>

        <div style={{ marginTop: "1rem" }}>{information?.email}</div>
        <RowView style={{ marginTop: "2rem" }}>
          <button
            onClick={() => {
              window.location.assign(information?.facebookURL);
            }}
          >
            <Img wd="2rem" src={facebook} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.instagramURL);
            }}
          >
            <Img wd="2rem" src={insta} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.linkedinURL);
            }}
          >
            <Img wd="2rem" src={linkedIn} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.twitterURL);
            }}
          >
            <Img wd="2rem" src={twitter} />
          </button>
        </RowView>
        <RowView style={{ marginTop: "1rem" }}>
          <button>
            <div>팔로워</div>
            <div style={{ marginLeft: "10px" }}>
              {information?.followerCount}
            </div>
          </button>
          <button>
            <div>팔로잉</div>
            <div style={{ marginLeft: "10px" }}>
              {information?.followingCount}
            </div>
          </button>
        </RowView>
        {/* <div>라인생기는 줄</div>
        <div>경력</div>
        <div>라인생기는 줄</div>
        <div>수상</div> */}
        <div>
          <Hr />
        </div>
        <MypageAbout>
          <div>about me</div>
          <div>{information?.aboutMe}</div>
        </MypageAbout>
      </MypageLeftDiv>
      <MyLeftMoreView>
        <MoreViewDiv>
          <div>비슷한 아티스트</div>
          <button>더보기 {">"}</button>
        </MoreViewDiv>
        <MypageLeftBottom />
        <MypageLeftBottom />
        <MypageLeftBottom />
      </MyLeftMoreView>
    </LeftTotalDiv>
  );
};

export default MypageLeft;

const LeftTotalDiv = styled.div`
  display: flex;
  width: 22%;
  flex-direction: column;
`;

const MypageLeftDiv = styled.div`
  margin: 0 1rem;
  padding-top: 5rem;
  width: 90%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MypageProfile = styled.img`
  border: 1px solid black;
  width: 13rem;
  height: 13rem;
  border-radius: 70%;
  margin-bottom: 1.5rem;
`;

const MypageBtn = styled.button`
  width: 60%;
  height: 2rem;
  border-radius: 20px;
  border: 1px solid #ff4d00;
  background-color: transparent;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MypageAbout = styled.div`
  width: 60%;
  div {
    margin: 10px 0;
  }
`;

const Hr = styled.hr`
  width: 180px;
  height: 0.5px;
  border: transparent;
  background-color: rgba(0, 0, 0, 0.2);
`;

const RowView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  span {
    /* width: 50px; */
    border-radius: 20px;
    font-size: 10px;
    padding: 2px 5px;
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, 0.2);
  }
  button {
    border: transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
  }
`;

const MyLeftMoreView = styled.div`
  width: 90%;
  margin: 0 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MoreViewDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  button {
    border: transparent;
    background-color: transparent;
  }
`;

const MypageShare = styled.div`
  width: 20rem;
  position: relative;
  border: 1px solid black;
  top: 20px;
  right: 20px;
  z-index: 1;
  background-color: white;
`;
