import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import DetailAudio from "./DetailAudio";
import DetailViewLikeShare from "./DetailViewLikeShare";
import DetailDayAndFollow from "./DetailDayAndFollow";
import DetailRecomment from "./DetailRecomment";

const url = [
  {
    id: 0,
    url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  },
];
const DetailTop = () => {
  const [totalPlay, setTotalPlay] = useState(false);
  const TotalBtn = () => {
    setTotalPlay(!totalPlay);
  };

  return (
    <PlayTop>
      <PlayBackIMG>
        <PlayHeader>
          <h1 style={{ marginTop: "3rem" }}>타이틀 이름</h1>
          <TotalPlayDiv>
            <PlayPauseIcon onClick={TotalBtn}>
              {totalPlay ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </PlayPauseIcon>
            <div>전체 재생바 들어갈 자리</div>
          </TotalPlayDiv>
          <AudioPlay>
            {url.map((u) => (
              <DetailAudio key={u.id} totalPlay={totalPlay} url={u} />
            ))}
          </AudioPlay>
        </PlayHeader>
      </PlayBackIMG>
      <DetailViewLikeShare />
      <DetailBottom>
        <DetailDayAndFollow />
        <DetailRecomment />
      </DetailBottom>
    </PlayTop>
  );
};

export default DetailTop;

const PlayTop = styled.div`
  z-index: 0;
  width: 110%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PlayBackIMG = styled.div`
  width: 100%;
  background-image: linear-gradient(
      rgba(240, 240, 240, 0.5),
      rgba(255, 255, 255, 1)
    ),
    url("http://cdn.edujin.co.kr/news/photo/202008/33539_61666_1423.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;

const PlayHeader = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const PlayPauseIcon = styled.button`
  width: 5rem;
  height: 5rem;
  border: transparent;
  background-color: transparent;
  color: #ff4d00;
  font-size: 5rem;
`;

const TotalPlayDiv = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AudioPlay = styled.div`
  height: 50rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
    border-radius: 1rem;
    height: 1px;
  }
`;

const DetailBottom = styled.div`
  margin: 10px auto 0;
  width: 120rem;
  display: flex;
  justify-content: flex-start;
`;
