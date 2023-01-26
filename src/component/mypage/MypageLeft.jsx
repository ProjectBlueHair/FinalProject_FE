import React from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import {
  facebook,
  insta,
  like,
  linkedIn,
  soundcloud,
  twitter,
  view,
} from "../../asset/pic";
import MypageLeftBottom from "./MypageLeftBottom";

const MypageLeft = () => {
  return (
    <LeftTotalDiv>
      <MypageLeftDiv>
        <MypageProfile src="data:image/jpeg;base64,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" />
        <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>유저 닉네임</h1>
        <RowView>
          <span>Re-engineered</span>
          <span>Outdoors</span>
        </RowView>
        <MypageBtn>프로필 편집</MypageBtn>
        <MypageBtn>공유</MypageBtn>
        <div style={{ marginTop: "1rem" }}>qwert1234@naver.com</div>
        <RowView style={{ marginTop: "2rem" }}>
          <button>
            <Img wd="2rem" src={facebook} />
          </button>
          <button>
            <Img wd="2rem" src={insta} />
          </button>
          <button>
            <Img wd="2rem" src={linkedIn} />
          </button>
          <button>
            <Img wd="2rem" src={twitter} />
          </button>
          <button>
            <Img wd="2rem" src={soundcloud} />
          </button>
        </RowView>
        <RowView style={{ marginTop: "1rem" }}>
          <button>
            <Img wd="1.5rem" src={view} />
            <div style={{ marginLeft: "10px" }}>count</div>
          </button>
          <button>
            <Img wd="1.3rem" src={like} />
            <div style={{ marginLeft: "10px" }}>count</div>
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
          <div>about me content</div>
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
  margin-bottom: 2rem;
`;

const MypageBtn = styled.button`
  width: 60%;
  height: 2rem;
  border-radius: 20px;
  border: 1px solid #ff4d00;
  background-color: transparent;
  margin: 5px auto;
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
  gap: 10px;
  margin-bottom: 10px;
  span {
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
