import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instanceAxios } from "../../dataManager/apiConfig";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import MypagePlayList from "./MypagePlayList";
import MypagePlayList2 from "./MypagePlayList2";

const MypageRight = () => {
  const dispatch = useDispatch();
  const [archiveList, setArchiveList] = useState([]);
  const [archiveList2, setArchiveList2] = useState([]);
  const { nickname } = useParams();
  const [page, setPage] = useState(0);
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

  const getArchive2 = async (name) => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get(`post/my-post/${name}`);
      setArchiveList2(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArchive(nickname);
    getArchive2(nickname);
    dispatch(__getGeneralUserInfo());
  }, [nickname, page]);

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

  // // 슬라이더 구현
  // const Slider = useRef(null);

  // useEffect(() => {
  //   const { current } = Slider;
  //   current.style.animation = "SV 1s";
  //   console.log(current.style.animation);
  // }, [page]);

  return (
    <MypageRightDiv>
      <MypageTop>
        <h1>보관함</h1>
        {/* <button>더보기 {">"}</button> */}
      </MypageTop>
      <MyRow>
        <ArrayBtn onClick={leftClick}>
          <SlArrowLeft />
        </ArrayBtn>
        <Tdiv>
          {archiveList.map((L) => (
            <div key={L.id}>
              <MypagePlayList L={L} key={L.id} getArchive={getArchive} />
            </div>
          ))}
        </Tdiv>
        <ArrayBtn onClick={rightClick}>
          <SlArrowRight />
        </ArrayBtn>
      </MyRow>

      <MypageTop style={{ marginTop: "5rem", alignItems: "baseline" }}>
        <h1>내가 작성한 게시물</h1>
      </MypageTop>
      <MyRow2>
        {archiveList2?.map((L, index) => (
          <MypagePlayList2 L={L} key={index} getArchive2={getArchive2} />
        ))}
      </MyRow2>
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
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 auto;
`;

const MyRow2 = styled.div`
  width: 98%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    padding: 0 5rem;
  }
  justify-items: center;
  gap: 2rem;
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
  padding-left: 2.5rem;
  /* animation: SVa;
  animation-duration: 3s;
  @keyframes SVa {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
`;
