import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPostList } from "../../redux/slice/mainSlice";
import MypagePlayList from "./MypagePlayList";

const MypageRight = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPostList());
  }, []);
  const List = useSelector((state) => state.main.posts);

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
        {List?.map((L) => (
          <MypagePlayList L={L} key={L.id} />
        ))}
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
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1em;
`;
