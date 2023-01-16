import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import DetailAudio from "./DetailAudio";
import DetailViewLikeShare from "./DetailViewLikeShare";
import DetailDayAndFollow from "./DetailDayAndFollow";
import DetailRecomment from "./DetailRecomment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getDetail,
  __getDetailCollabo,
  __getDetailMusic,
} from "../../redux/slice/detailSlice";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const url = [
  {
    id: 0,
    url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  },
  {
    id: 1,
    url: "https://staudio315610.s3.eu-west-1.amazonaws.com/Coins.mp3",
  },
];
const DetailTop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [totalPlay, setTotalPlay] = useState(false);
  const TotalBtn = () => {
    setTotalPlay(!totalPlay);
  };

  useEffect(() => {
    dispatch(__getDetail(id));
    dispatch(__getDetailCollabo(id));
    dispatch(__getDetailMusic(id));
  }, []);

  const detail = useSelector((state) => state.detail.detail);
  const detailColabo = useSelector((state) => state.detail.collabo);
  const detailMusic = useSelector((state) => state.detail.music.data);

  // console.log(detailMusic);
  return (
    <PlayTop>
      <PlayBackIMG src="detailVie">
        <PlayHeader>
          <h1 style={{ marginTop: "3rem" }}>{detail?.title}</h1>
          <TotalPlayDiv>
            <PlayPauseIcon onClick={TotalBtn}>
              {totalPlay ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </PlayPauseIcon>
            <AudioPlayer
              layout="horizontal-reverse"
              style={{
                width: "1000px",
                height: "100px",
                // display: "flex",
                backgroundColor: "transparent",
                border: "1px solid transparent",
              }}
              onPlay={TotalBtn}
              // 다음곡 넘기는거 없앰
              showSkipControls={false}
              // 되감기 없앰
              showJumpControls={false}
              // 볼륨 색상보여줌
              // showFilledVolume={true}
              // 루프(반복기능 제거)
              customAdditionalControls={[]}
              // // // 플레이 버튼 커스텀
              customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
              // // // 커스텀 마이징(시간, 바 커스텀)
              customProgressBarSection={[
                RHAP_UI.CURRENT_LEFT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
              ]}
            />
          </TotalPlayDiv>
          <AudioPlay>
            {detailMusic &&
              detailMusic?.map((u) => (
                <DetailAudio
                  key={u.id}
                  totalPlay={totalPlay}
                  setTotalPlay={setTotalPlay}
                  url={u.musicFile}
                  id={u.id}
                />
              ))}
          </AudioPlay>
        </PlayHeader>
      </PlayBackIMG>
      <DetailViewLikeShare />
      <DetailBottom>
        <DetailDayAndFollow detail={detail} />
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
      rgba(240, 240, 240, 0.7),
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
