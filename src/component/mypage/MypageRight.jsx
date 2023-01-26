import React from "react";
import styled from "styled-components";
import MypagePlayList from "./MypagePlayList";

const MypageRight = () => {
  return (
    <MypageRightDiv>
      <MypageTop>
        <h1>가장 인기 있는 곡</h1>
        <button>더보기 {">"}</button>
      </MypageTop>
      <MyRow>
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
      </MyRow>
      <MypageTop style={{ marginTop: "5rem", alignItems: "baseline" }}>
        <h1>모든 곡</h1>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>정렬</div>
          <select style={{ border: "transparent" }}>
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </div>
      </MypageTop>
      <MyRow>
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
        <MypagePlayList />
      </MyRow>
    </MypageRightDiv>
  );
};

export default MypageRight;

const MypageRightDiv = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const MypageTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  button {
    margin-right: 10px;
    border: transparent;
    background-color: transparent;
  }
`;

const MyRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* border: 1px solid black; */
  gap: 1em;
`;
