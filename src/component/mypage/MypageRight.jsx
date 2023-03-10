import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../../dataManager/interceptors";
import { __getCollaboRequestedInfo } from "../../redux/slice/postingSlice";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import MypagePlayList from "./MypagePlayList";
import MypagePlayList2 from "./MypagePlayList2";

const MypageRight = () => {
  const [archiveList, setArchiveList] = useState([]);
  const [archiveList2, setArchiveList2] = useState([]);
  const { nickname } = useParams();
  const [page, setPage] = useState(0);
  const [pageTwo, setPageTwo] = useState(0);
  const getArchive = async (name) => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`post/archive/${name}?page=${page}&size=4`);
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
      } = await apiClient.get(
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
          <h1>?????????</h1>
          {/* <button>????????? {">"}</button> */}
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
            <NotDataDiv>???????????? ?????? ????????????</NotDataDiv>
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
          <h1>?????? ????????? ?????????</h1>
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
            <NotDataDiv> ???????????? ?????? ????????????</NotDataDiv>
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
