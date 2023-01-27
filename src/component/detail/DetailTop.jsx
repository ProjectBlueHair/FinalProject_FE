import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DetailAudio from "./DetailAudio";
import DetailViewLikeShare from "./DetailViewLikeShare";
import DetailDayAndFollow from "./DetailDayAndFollow";
import DetailRecomment from "./DetailRecomment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetail, __getDetailMusic } from "../../redux/slice/detailSlice";
// import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { __cleanUp, __getAudios } from "../../redux/slice/postingSlice";
import PostingTotalPlay from "../posting/PostingTotalPlay";
import PostingAudioBars from "../posting/PostingAudioBars";
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
    // dispatch(__getDetailMusic(id));
    dispatch(__getAudios(id));
    return () => {
      dispatch(__cleanUp());
    };
  }, [id]);
  // 뷰숫자, 좋아요 숫자, 제목, 내용, 배경이미지파일 (+ 작성일 추가)
  const detail = useSelector((state) => state.detail.detail.data)
  // 각 페이지 음악파일(props작업 끝)
  // const detailMusic = useSelector((state) => state.detail.music.data);

  return (
    <PlayTop>
      <PlayBackIMG imgs={detail?.postImg}>
        <h1>{detail?.title}</h1>
        <PostingTotalPlay />
        <PostingAudioBars />
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
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PlayBackIMG = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 35px 40px 20px;
  gap: 1.5rem;

  background-image: linear-gradient(
      rgba(240, 240, 240, 0.5),
      rgba(255, 255, 255, 1)
    ),
    url(${(props) => props.imgs});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%, 50%;
`;

const DetailBottom = styled.div`
  margin: 10px auto 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
