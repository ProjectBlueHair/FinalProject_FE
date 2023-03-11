import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveSurferParams } from "wavesurfer.js/types/params";
import { Wavesurfer } from "./H5SurferModel.types";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  h5PlayerSelector,
  __audioOnLoaded,
} from "../../redux/slice/h5surferSlice";
import theme from "../../styles/theme";
import Flex from "../elem/Flex";
import { AUDIO_BAR_HEIGHT } from "./AudioStyleConstants";

const AudioWaveSurfer: React.FC<Wavesurfer & { index: number }> = (props) => {

  const wavesurfer = useRef<WaveSurfer | null>(null);

  const waveformRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  
  const progressControl = useAppSelector(h5PlayerSelector);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create(
      waveSurferOptions(waveformRef.current as HTMLDivElement)
    );
    wavesurfer.current.load(props.audioSrcInfo.musicFile);
    wavesurfer.current.on("ready", () => {
      if (wavesurfer.current) {
        dispatch(__audioOnLoaded(props.index));
        wavesurfer.current.setVolume(props.volume);
      }
    });
    wavesurfer.current.on("finish", () => {
      wavesurfer.current?.play(0);
    });
    return () => wavesurfer.current?.destroy();
  }, [props.audioSrcInfo.musicFile]);

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
  function waveSurferOptions(ref: HTMLDivElement) {
    const params: WaveSurferParams = {

      audioRate: 1,

      barWidth: 3,
      // 웨이브 높이
      height: AUDIO_BAR_HEIGHT - 5,
      container: ref,
      // 커서 줄색상 : 커서 컨트롤 안할것이기 때문에 투명
      cursorColor: "transparent",
      // 실행된 부분 색상
      progressColor: theme.color.main,
      // 배경색은 컨트롤 박스랑 함께 감싸고 있는 div 색상
      backgroundColor: "transparent",
      // 웨이브 색상
      waveColor: theme.color.secondaryBg,
      // true 이면 가장 큰 막대의 길이에 비례하여 막대 높이 설정
      normalize: true,
      // 각음악 부분 클릭에 대해 막음
      interact: false,
      // 반응형 웨이브폼 여부
      responsive: true,
      // 하단 가로스크롤바
      hideScrollbar: true,
    };
    return params;
  }
};

export default AudioWaveSurfer;
