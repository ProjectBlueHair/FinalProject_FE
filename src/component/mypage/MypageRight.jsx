import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instanceAxios } from "../../dataManager/apiConfig";
import { __getCollaboRequested } from "../../redux/slice/postingSlice";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import MypagePlayList from "./MypagePlayList";
import MypagePlayList2 from "./MypagePlayList2";

const MypageRight = () => {
  const dispatch = useDispatch();
  const [archiveList, setArchiveList] = useState([]);
  const [archiveList2, setArchiveList2] = useState([]);
  const { nickname } = useParams();
  const [page, setPage] = useState(0);
  const [pageTwo, setPageTwo] = useState(0);
  const getArchive = async (name) => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get(`post/archive/${name}?page=${page}&size=4`);
      setArchiveList(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(pageTwo);
  const getArchive2 = async (name) => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get(
        `post/my-post/${name}?page=${pageTwo}&size=4`
      );
      setArchiveList2(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArchive(nickname);
    getArchive2(nickname);
    dispatch(__getGeneralUserInfo());
  }, [nickname, page, pageTwo]);

  const leftClick = () => {
    if (page < 0 || page === 0) {
      setPage(0);
    } else {
      setPage(Number(page - 1));
    }
  };
  const rightClick = () => {
    if (archiveList.length < 4) {
      setPage(Number(page + 0));
    } else {
      setPage(Number(page + 1));
    }
  };

  const leftClickTwo = () => {
    if (pageTwo < 0 || pageTwo === 0) {
      setPageTwo(0);
    } else {
      setPageTwo(Number(pageTwo - 1));
    }
  };
  const rightClickTwo = () => {
    if (archiveList2.length < 4) {
      setPageTwo(Number(pageTwo + 0));
    } else {
      setPageTwo(Number(pageTwo + 1));
    }
  };

  return (
    <MypageRightDiv>
      <>
        <MypageTop>
          <h1>보관함</h1>
          {/* <button>더보기 {">"}</button> */}
        </MypageTop>
        <MyRow>
          {page === 0 ? (
            <div></div>
          ) : (
            <ArrayBtn onClick={leftClick}>
              <SlArrowLeft />
            </ArrayBtn>
          )}

          {archiveList.length === 0 ? (
            <NotDataDiv>보관함이 비어 있습니다</NotDataDiv>
          ) : (
            <Tdiv>
              {archiveList.map((L) => (
                <div key={L.id}>
                  <MypagePlayList L={L} key={L.id} getArchive={getArchive} />
                </div>
              ))}
            </Tdiv>
          )}
          {archiveList.length < 4 ? (
            <div></div>
          ) : (
            <ArrayBtn onClick={rightClick}>
              <SlArrowRight />
            </ArrayBtn>
          )}
        </MyRow>
      </>
      <>
        <MypageTop style={{ marginTop: "5rem", alignItems: "baseline" }}>
          <h1>내가 작성한 게시물</h1>
        </MypageTop>
        <MyRow>
          {pageTwo === 0 ? (
            <div></div>
          ) : (
            <ArrayBtn onClick={leftClickTwo}>
              <SlArrowLeft />
            </ArrayBtn>
          )}

          {archiveList2.length === 0 ? (
            <NotDataDiv> 게시물이 비어 있습니다</NotDataDiv>
          ) : (
            <Tdiv>
              {archiveList2?.map((L, index) => (
                <MypagePlayList2 L={L} key={index} getArchive2={getArchive2} />
              ))}
            </Tdiv>
          )}
          {archiveList2.length < 4 ? (
            <div></div>
          ) : (
            <ArrayBtn onClick={rightClickTwo}>
              <SlArrowRight />
            </ArrayBtn>
          )}
        </MyRow>
      </>
    </MypageRightDiv>
  );
};

export default MypageRight;

const MypageRightDiv = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30%;
  height: 100%;
  overflow: auto;
`;

const MypageTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MyRow = styled.div`
  width: 98%;
  min-height: 250px;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 10px 0 0;
`;

const ArrayBtn = styled.button`
  width: 3rem;
  height: 3rem;
  border: transparent;
  color: white;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #ff4d00;
  }
`;

const Tdiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-left: 1.3rem;
`;

const NotDataDiv = styled.div`
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
`;
