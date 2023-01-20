import React, { useEffect, useRef } from "react";
import { audioControlSelector } from "../../redux/slice/postingSlice";
import { Audio, ProgressControl } from "../../model/PostingModel";
import WaveSurfer from "wavesurfer.js";
import { useAppSelector } from "../../redux/config";
import Flex from "../elem/Flex";

const PostingAudioBar: React.FC<Audio & { index: number } & ProgressControl> = (
  props
) => {
  const formWaveSurferOptions = (ref: HTMLDivElement) => ({
    // 재생 속도
    audioRate: 1,
    // 바 가로 길이
    barWidth: 3,
    // 웨이브 높이
    height: 80,
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
  });

  const wavesurfer = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const playControl = useAppSelector(audioControlSelector);

  useEffect(() => {
    const options = formWaveSurferOptions(
      waveformRef.current as HTMLDivElement
    );
    wavesurfer.current = WaveSurfer.create(options);
    console.log("props.audioInfo.src", props.audioData.musicFile);
    wavesurfer.current.load(props.audioData.musicFile);
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(props.volume);
      }
    });

    return () => wavesurfer.current?.destroy();
  }, [props.audioData.musicFile]);

  useEffect(() => {
    wavesurfer.current?.setVolume(props.volume);
  }, [props.volume]);

  useEffect(() => {
    playControl.isPlaying
      ? wavesurfer.current?.play()
      : wavesurfer.current?.pause();
  }, [playControl.isPlaying]);

  useEffect(() => {
    if (playControl.seekTo) {
      wavesurfer.current?.setCurrentTime(playControl.seekTo);
    }
  }, [playControl.seekTo]);
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
