import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instanceAxios } from "../../dataManager/apiConfig";
import MypagePlayList from "./MypagePlayList";
import MypagePlayList2 from "./MypagePlayList2";

const MypageRight = () => {
  const [archiveList, setArchiveList] = useState([]);
  const [archiveList2, setArchiveList2] = useState([]);
  const { nickname } = useParams();
  // const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(0);
  console.log(page);
  // const offset = (page - 1) * limit;
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
  }, [nickname, page]);
  const Sli = useRef(null);

  const leftClick = () => {
    if (page < 0 || page === 0) {
      setPage(0);
    } else {
      setPage(Number(page - 1));
    }
    Sli.current.style.animation = "1s linear 0s 0 normal none running Lslide";
  };
  console.log(Sli);
  const rightClick = () => {
    if (archiveList.length < 4) {
      setPage(Number(page + 0));
    } else {
      setPage(Number(page + 1));
    }
  };

  return (
    <MypageRightDiv>
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
        <Tdiv ref={Sli}>
          {archiveList.map((L) => (
            <div key={L.id}>
              <MypagePlayList L={L} key={L.id} getArchive={getArchive} />
            </div>
          ))}
        </Tdiv>

        {archiveList.length < 4 ? (
          ""
        ) : (
          <ArrayBtn onClick={rightClick}>
            <SlArrowRight />
          </ArrayBtn>
        )}
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
  height: 250px;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  flex-wrap: wrap;
  justify-items: center;
  gap: 1rem;
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
  @keyframes Lslide {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;

const Tdiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
