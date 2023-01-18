import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import Img from "../elem/Img";
import { volumeVector, volumedown } from "../../asset/pic";
import Emitter from "../detail/EventEmitter";

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
  const totalPlay = props.totalPlay;
  const url = props.url;
  const part = props.part;
  const userName = props.userName;
  const wavesurfer = useRef(null);
  const waveformRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [volView, setVolView] = useState(false);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    // option은 formWaveSurferOprions에 있는 값들은 가져옴
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    // 웨이브 서퍼 객체안에 solo를 만들어 주고 false 값을 넣어줌
    wavesurfer.current.solo = false;
    // 웨이브 서퍼 구독했을때
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    // 웨이브 서퍼 플레이
    wavesurfer.current.on("play", () => {
      props.setTotalPlay(true);
    });
    // 웨브서 서퍼 중지 했을때
    wavesurfer.current.on("pause", () => {
      props.setTotalPlay(false);
    });

    // 음악 재생 종료시 전체 실행 버튼이 중지상태 시작상태로 변경됨
    wavesurfer.current.on("finish", () => {
      props.setTotalPlay(false);
    });

    // wavesurfer.current.getMute() - true일땐 음소거된상태 / false일땐 음소거해제

    Emitter.on("soloON", () => {
      //   // 만약 wavesurfer.current.solo가(false)/ wavesurfer.current.getMute()가 (false)
      if (!wavesurfer.current.solo && !wavesurfer.current.getMute()) {
        // 위 조건 만족이 음소거상태 만듬
        wavesurfer.current.setMute(true);
        setVolView(true);
        // 만약 wavesurfer.current.solo (false) / wavesurfer.current.getMute()가 (true)
      } else if (!wavesurfer.current.solo && wavesurfer.current.getMute()) {
        wavesurfer.current.setMute(false);
        setVolView(false);
      } else if (wavesurfer.current.solo) {
        wavesurfer.current.setMute(false);
        setVolView(false);
      }
    });
    // Emitter.on("soloOFF", () => {
    //   wavesurfer.current.solo = false;
    //   setSolo(false);
    //   if (!wavesurfer.current.wasMuted) {
    //     wavesurfer.current.setMute(false);
    //     setVolView(false);
    //   } else {
    //     wavesurfer.current.setMute(true);
    //     setVolView(true);
    //   }
    // });

    return () => {
      wavesurfer.current.unAll();
      wavesurfer.current.destroy();
    };
  }, [url]);

  //  전체 실행이 됩니다!!! 무조건 맞음
  useEffect(() => {
    // true일땐 전체 재생
    if (totalPlay === true) {
      wavesurfer.current.play();
    }
    // false일땐 전체 멈추기
    else {
      wavesurfer.current.pause();
    }
  }, [totalPlay]);

  // 볼륨 조절 로직
  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
      setVolView(false);
    }
  };
  // 음소거 버튼 클릭시 음소거 가능!
  const volumeClick = () => {
    setVolView(!volView);
  };

  useEffect(() => {
    if (volView == true) {
      wavesurfer.current.setMute(true);
    } else {
      wavesurfer.current.setMute(false);
    }
  }, [volView]);

  /// 클릭시 각각의 버튼 솔로버튼 상태값
  const soloClick = () => {
    setSolo(!solo);
    // 만약 wavesurfer.current.solo(false) && volView가 true 일때
    if (!wavesurfer.current.solo) {
      // 솔로 상태를 true로 바꿈
      wavesurfer.current.solo = true;
      //만약 wavesurfer.current.solo(false) && volView(false)
    } else if (!wavesurfer.current.solo && !volView) {
      // wavesurfer.current.solo를 true로 바꿈
      wavesurfer.current.solo = true;
      // 위에꺼 만족못하고 솔로값이 false일때
    } else if (wavesurfer.current.solo) {
      wavesurfer.current.solo = false;
    }
  };
  // console.log("currnetSolo", wavesurfer.current?.solo);
  // console.log("volview", volView);

  // useEffect(() => {
  //   // solo boolean값이 참이면 soloON 실행, 거짓이면 soloOFF
  //   Emitter.emit(`${solo ? "soloON" : "soloOFF"}`);
  // }, [solo]);

  return (
    <WaveTotal>
      <WaveLeft>
        <WaveCreate>
          <div>{part}</div>
          <span>{userName}</span>
        </WaveCreate>
        <WaveSound>
          <div>
            <button onClick={volumeClick}>
              {volView ? (
                <Img wd="4rem" src={volumedown} />
              ) : (
                <Img wd="1.5rem" src={volumeVector} />
              )}
            </button>
          </div>
          <button onClick={soloClick} id="solobtnA">
            {solo ? "onsolo" : "solo"}
          </button>
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
