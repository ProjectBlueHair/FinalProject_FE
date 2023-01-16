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
  audioControl,
  audiosSelector,
  PostingState,
} from "../../redux/slice/postingSlice";
import PostingAudioControlBox from "./PostingAudioControlBox";
import { AUDIO_BAR_GAP } from "../../page/PostingPage";
export const AUDIO_BAR_RADIUS = '4rem'
export const AUDIO_BAR_HEIGHT = '8rem'

const PostingAudioBars = () => {
  const audios = useAppSelector(audiosSelector);
  const progressControl = useAppSelector(audioControl);

  return (
    <Flex direction="column" gap={AUDIO_BAR_GAP}>
      {audios.map((audio, index) => (
        <Flex type="audioBar"  hg={AUDIO_BAR_HEIGHT} radius={AUDIO_BAR_RADIUS}>
          <PostingAudioControlBox isNew={audio.isNewAudio} index={index} {...audio}/>
          <Flex type="audioBarRight">
            <PostingAudioBar {...audio} {...progressControl} index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostingAudioBars;
