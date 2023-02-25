import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { Audio } from "../../model/PostingModel";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  audioControlSelector,
  __audioOnLoaded
} from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import { AUDIO_BAR_HEIGHT } from "./PostingAudioBars";

const PostingAudioBar: React.FC<Audio & { index: number }> = (props) => {
  const formWaveSurferOptions = (ref: HTMLDivElement) => ({
    // 재생 속도
    audioRate: 1,
    // 바 가로 길이
    barWidth: 3,
    // 웨이브 높이
    height: AUDIO_BAR_HEIGHT - 5,
    // ref css요소같은거 연동? 해줌
    container: ref,
    // 커서 줄색상 (없애는게 좋아보임)
    cursorColor: "transparent",
    // 실행된 부분 색상
    progressColor: "#ff4d00",
    // 배경색 투명
    backgroundColor: "transparent",
    // 웨이브 색상
    waveColor: "#505050",
    // true 이면 가장 큰 막대의 길이에 비례하여 막대 높이 설정
    normalize: true,
    // 렌더링 속도를 개선
    partialRender: true,
    // 각음악 부분 클릭에 대해 막음
    interact: false,
    // 반응형 웨이브폼 여부
    responsive: true,
    // 하단 가로스크롤바
    hideScrollbar: true,
  });

  const wavesurfer = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const progressControl = useAppSelector(audioControlSelector);

  useEffect(() => {
    const options = formWaveSurferOptions(
      waveformRef.current as HTMLDivElement
    );
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(props.audioData.musicFile);
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        dispatch(__audioOnLoaded(props.index));
        wavesurfer.current.setVolume(props.volume);
      }
    });
    wavesurfer.current.on("finish", function () {
      wavesurfer.current?.play(0);
    });
    return () => wavesurfer.current?.destroy();
  }, [props.audioData.musicFile]);

  useEffect(() => {
    wavesurfer.current?.setVolume(props.volume);
  }, [props.volume]);

  useEffect(() => {
    progressControl.isPlaying
      ? wavesurfer.current?.play()
      : wavesurfer.current?.pause();
  }, [progressControl.isPlaying]);

  useEffect(() => {
    const duration = wavesurfer.current?.getDuration();

    wavesurfer.current?.setCurrentTime(
      duration ? progressControl.seekTo % duration : progressControl.seekTo
    );
  }, [progressControl.seekTo]);

  return (
    <Flex justify="flex-start" wd="98%">
      <div
        style={{
          width: "100%",
          padding: "0.3rem 0.3rem",
          marginLeft: "-1rem",
          overflow: "hidden",
        }}
        ref={waveformRef}
      />
    </Flex>
  );
};

export default PostingAudioBar;
