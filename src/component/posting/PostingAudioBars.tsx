import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import DetailAudio from "../detail/DetailAudio";
import DetailViewLikeShare from "../detail/DetailViewLikeShare";
import DetailDayAndFollow from "../detail/DetailDayAndFollow";
import DetailRecomment from "../detail/DetailRecomment";
import { PlayBackIMG } from "../detail/DetailTop";
import Flex from "../elem/Flex";
import PostingAudioBar from "./PostingAudioBar";
import { useAppSelector } from "../../redux/config";
import { MainState } from "../../redux/slice/mainSlice";
import {
  Audio,
  audiosSelector,
  PostingState,
} from "../../redux/slice/postingSlice";

const musics = [
  {
    id: 0,
    url: "https://mybucket-mcho.s3.ap-northeast-2.amazonaws.com/music-test/vocal.m4a",
  },
];
const PostingAudioBars = () => {
  const audios  = useAppSelector(audiosSelector);

  return (
    <Flex direction="column">
      {audios.map((audio) => (
        // <PostingAudioBar />
        <div></div>
      ))}
    </Flex>
  );
};

export default PostingAudioBars;
