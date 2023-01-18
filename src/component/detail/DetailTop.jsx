import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import DetailAudio from "./DetailAudio";
import DetailViewLikeShare from "./DetailViewLikeShare";
import DetailDayAndFollow from "./DetailDayAndFollow";
import DetailRecomment from "./DetailRecomment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetail, __getDetailMusic } from "../../redux/slice/detailSlice";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

const DetailTop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [totalPlay, setTotalPlay] = useState(false);
  const TotalBtn = () => {
    setTotalPlay(!totalPlay);
  };

  useEffect(() => {
    dispatch(__getDetail(id));
    dispatch(__getDetailMusic(id));
  }, []);
  // 뷰숫자, 좋아요 숫자, 제목, 내용, 배경이미지파일 (+ 작성일 추가)
  const detail = useSelector((state) => state.detail.detail.data);
  // 각 페이지 음악파일(props작업 끝)
  const detailMusic = useSelector((state) => state.detail.music.data);

  return (
    <PlayTop>
      <PlayBackIMG imgs={detail?.postImg}>
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
              detailMusic?.map((u, index) => (
                <DetailAudio
                  key={index}
                  totalPlay={totalPlay}
                  setTotalPlay={setTotalPlay}
                  url={u.musicFile}
                  part={u.musicPart}
                  userName={u.nickname}
                  id={u.id}
                />
              ))}
          </AudioPlay>
        </PlayHeader>
      </PlayBackIMG>
      <DetailViewLikeShare detail={detail} />
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

export const PlayBackIMG = styled.div`
  width: 100%;
  background-image: linear-gradient(
      rgba(240, 240, 240, 0.7),
      rgba(255, 255, 255, 1)
    ),
    url(${(props) => props.imgs});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%, 50%;
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

// style={{ backgroundImage: `url(${detail.postImg})` }}
