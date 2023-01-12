import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import Img from "../elem/Img";
import { volumeVector, volumedown } from "../../asset/pic";

const formWaveSurferOptions = (ref) => ({
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

const DetailAudio = (props) => {
  const playPause = props.totalPlay;
  const { url } = props.url;
  const wavesurfer = useRef(null);
  const waveformRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [volView, setVolView] = useState(true);

  useEffect(() => {
    // option은 formWaveSurferOprions에 있는 값들은 가져옴
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    // wavesurfer.current.playPause();
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url]);
  // 볼륨 조절 로직
  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
      setVolView(true);
    }
  };
  // true일땐 전체 플레이
  if (playPause === true) {
    wavesurfer.current.play();
  }
  // false일땐 전체 멈추기
  if (playPause === false) {
    wavesurfer.current?.pause();
  }
  // 음소거 버튼 클릭시 음소거 가능!
  const volumeClick = () => {
    setVolView(!volView);
  };
  // volView 버튼 클릭시 false 상태일땐 음소거 true 일땐 음소거 해제
  if (volView === false) {
    wavesurfer.current?.setMute(true);
  } else {
    wavesurfer.current?.setMute(false);
  }
  return (
    <WaveTotal>
      <WaveLeft>
        <WaveCreate>
          <div>악기 종류</div>
          <span>작곡가</span>
        </WaveCreate>
        <WaveSound>
          <div>
            <button onClick={volumeClick}>
              {volView ? (
                <Img wd="1.5rem" src={volumeVector} />
              ) : (
                <Img wd="4rem" src={volumedown} />
              )}
            </button>
          </div>
          <div>솔로</div>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
        </WaveSound>
      </WaveLeft>
      <WaveView id="waveform" ref={waveformRef} />
    </WaveTotal>
  );
};

export default DetailAudio;

const WaveTotal = styled.div`
  width: 130rem;
  height: 12rem;
  display: flex;
`;

const WaveLeft = styled.div`
  margin: 20px 20px;
  width: 20%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  background-color: #ff4d00;
`;

const WaveCreate = styled.div`
  width: 22rem;
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    color: #ff4d00;
    background-color: white;
    font-size: 13px;
    border-radius: 10px;
    padding: 3px 15px;
  }
  span {
    color: white;
    font-size: 13px;
  }
`;

const WaveSound = styled.div`
  display: flex;
  align-items: center;
  width: 22rem;
  margin-top: 1rem;
  gap: 1rem;
  input {
    width: 15rem;
    height: 2px;
  }
  button {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 70%;
    border: transparent;
  }
`;

const WaveView = styled.div`
  width: 95rem;
  margin: 20px 0;
`;
