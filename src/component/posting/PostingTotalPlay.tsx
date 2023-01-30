import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { pause, playPrimary } from "../../asset/pic";
import { iconSize } from "../../styles/GlobalStyle";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  audioControlSelector,
  __seekTo,
  __togglePlay,
} from "../../redux/slice/postingSlice";

import styled from "styled-components";
import PlayLoading from "../elem/PlayLoading";

const PostingTotalPlay = () => {
  const audioPlayer = useRef<AudioPlayer>(null);
  const dispatch = useAppDispatch();
  const progressConrol = useAppSelector(audioControlSelector);
  const [isLoading, setIsLoading] = useState(false);
  console.log("progressConrol.onLoad", progressConrol.onLoad);

  useEffect(() => {
    if (!progressConrol.onLoad && !isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

  }, [progressConrol.onLoad]);
  const handlePlay = () => {
    dispatch(__togglePlay(true));
  };
  const handlePause = () => {
    dispatch(__togglePlay(false));
  };
  const handleSeeking = () => {
    dispatch(__seekTo(audioPlayer.current?.audio.current?.currentTime));
  };
  return (
    <Flex>
      {progressConrol.src ? (
        <ProgressWrapper>
          <AudioPlayer
            autoPlayAfterSrcChange={false}
            src={progressConrol.src}
            muted={true}
            // onPlay={handlePlay} // safari에서 유저 interaction으로 인식 안해서 재생 안됨. 따라서 이미지에다가 onClick이벤트에 핸들러를 넣어줌
            // onPause={handlePause}
            onSeeking={handleSeeking}
            autoPlay={false}
            ref={audioPlayer}
            layout="horizontal-reverse"
            showJumpControls={false}
            showSkipControls={false}
            timeFormat="auto"
            customProgressBarSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.CURRENT_TIME,
              // <span>0:00</span>,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
            ]}
            customAdditionalControls={[]}
            customIcons={{
              play: isLoading ? (
                <PlayLoading />
              ) : (
                <Img
                  onClick={()=>{handlePlay()}}
                  mg="0 2rem 0 0"
                  type="icon"
                  wd={iconSize}
                  src={playPrimary}
                />
              ),
              pause: (
                <Img 
                onClick={()=>{handlePause()}}

                mg="0 2rem 0 0" type="icon" wd={iconSize} src={pause} />
              ),
            }}
            customControlsSection={[]}
          />
        </ProgressWrapper>
      ) : null}
    </Flex>
  );
};

export default PostingTotalPlay;
const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  .rhap_container {
    display: flex;
    width: 100%;
    margin-left: 8rem;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .rhap_main {
    flex-direction: column;
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .rhap_progress-section {
    display: flex;
    height: 100%;
    /* flex: 3 1 auto; */
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }

  .rhap_progress-container {
    display: flex;
    align-items: center;
    height: 20px;
    flex: 1 0 100px;
    align-self: center;
    margin: 0 calc(10px + 1%);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .rhap_progress-container:focus:not(:focus-visible) {
    outline: 0;
  }

  .rhap_progress-bar {
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 4px;
    background-color: var(--ec-secondary-background);
    border-radius: 2px;
  }

  .rhap_progress-filled {
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: var(--ec-main-color);
    border-radius: 2px;
  }
  .rhap_progress-bar-show-download {
    /* background-color: rgba(221, 221, 221, 0.5); */
  }

  .rhap_download-progress {
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: #ffffff;
    border-radius: 2px;
  }

  .rhap_progress-indicator {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    width: 4.5px;
    height: 14px;

    margin-left: -0px;
    top: -5px;

    background: var(--ec-main-color);
    border-radius: 50px;
  }
  .rhap_time {
    color: #333;
    /* font-size: 16px; */
    font-size: 1.4rem;
    font-weight: 400;
    user-select: none;
    -webkit-user-select: none;
  }

  .rhap_controls-section {
    width: 100%;
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
  }

  .rhap_volume-controls {
    display: flex;
    width: 100%;
    height: 100%;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
  }

  .rhap_volume-button {
    /*   flex: 0 0 26px;
  font-size: 26px;
  width: 26px;
  height: 26px;
  color: #868686;
  margin-right: 6px; */
    flex: 1 0 40px;
  }

  .rhap_volume-container {
    display: flex;
    width: 100%;
    align-items: center;
    flex: 0 1 100px;
    user-select: none;
    -webkit-user-select: none;
  }

  .rhap_volume-bar-area {
    display: flex;
    align-items: center;
    width: 100%;
    height: 14px;
    cursor: pointer;
  }
  .rhap_volume-bar-area:focus:not(:focus-visible) {
    outline: 0;
  }

  .rhap_volume-bar {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 4px;
    background: #dddddd;
    border-radius: 2px;
  }

  .rhap_volume-indicator {
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    margin-left: -4px;
    left: 0;
    top: -3px;
    background: #000;
    opacity: 0.9;
    border-radius: 50px;
    /*   box-shadow: rgba(134, 134, 134, 0.5) 0 0 3px; */
    cursor: pointer;
  }
  .rhap_volume-indicator:hover {
    opacity: 0.9;
  }

  .rhap_volume-filled {
    height: 100%;
    position: absolute;
    z-index: 99;
    background-color: #000000;
    border-radius: 2px;
  }

  /* Utils */
  .rhap_button-clear {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    line-height: 0;
    /* height: 100%; */
    /* align-content: center; */

    /* overflow: hidden; */
    /*   cursor: pointer; */
  }
  .rhap_button-clear:hover {
    opacity: 0.9;
    transition-duration: 0.2s;
  }
  .rhap_button-clear:active {
    opacity: 0.95;
  }
  .rhap_button-clear:focus:not(:focus-visible) {
    outline: 0;
  }
`;
