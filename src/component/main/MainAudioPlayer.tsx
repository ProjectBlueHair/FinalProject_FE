import React, { useEffect, useRef } from "react";
import Flex from "../elem/Flex";
import styled from "styled-components";
import Img from "../elem/Img";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  mute,
  pause,
  playPrimary,
  repeat,
  shuffle,
  skipNext,
  skipPrev,
  volume,
} from "../../asset/pic";
import { iconSize } from "../../styles/GlobalStyle";
import {
  __PlayerTogglePlay,
  __playNext,
  __PlayPrevious,
} from "../../redux/slice/mainSlice";
import { CurrentMusic } from "../../model/MainModel";

import { useAppDispatch, useAppSelector } from "../../redux/config";
const MainAudioPlayer = () => {
  const audioPlayer = useRef<AudioPlayer>(null);
  const { post, isPlayingMain } = useAppSelector<CurrentMusic>(
    (state) => state.main.currentMusic
  );
  const dispatch = useAppDispatch();

  const onPlayHandler = () => {
    dispatch(__PlayerTogglePlay(true));
  };
  const onPauseHandler = () => {
    dispatch(__PlayerTogglePlay(false));
  };
  const onClickPrevious = () => {
    dispatch(__PlayPrevious(post.id));
  };
  const onClickNext = () => {
    dispatch(__playNext(post.id));
  };
  useEffect(() => {
    if (isPlayingMain) {
      audioPlayer.current!.audio.current!.play();
    } else {
      audioPlayer.current!.audio.current!.pause();
    }
  }, [isPlayingMain]);

  return (
    // musicbar wrap
    <Flex
      justify="flex-start"
      pd="0.5rem 2rem"
      borderTop="0.2rem solid var(--ec-main-color)"
    >
      <Grid>
        {/* flex row left grid [postImg, column, more]*/}
        <Flex direction="row" justify="flex-center" gap="var(--ec-gap2)">
          <Img
            type="radius"
            radius="10px"
            wd="6rem"
            hg="5rem"
            src={post?.postImg}
          />
          {/* flexColumn [title, profile] */}
          <Flex
            direction="column"
            align="flex-start"
            gap="var(--ec-gap1)"
            wd="none"
          >
            <div>{post?.title}</div>
            {/* flexRow [profile img, nickname]*/}
            <Flex justify="flex-start" gap="var(--ec-gap2)" wd="none">
              <Img
                type="shadowProfile"
                wd="3rem"
                src={
                  post?.mainProfileList &&
                  post.mainProfileList.length &&
                  post.mainProfileList[0].profileImg
                }
              />
              <div>
                {post?.mainProfileList &&
                  post.mainProfileList.length &&
                  post.mainProfileList[0].nickname}
              </div>
            </Flex>
          </Flex>
        </Flex>

        {/* flex row right grid [music btns, music bar, volume control] */}
        <AudioPlayer
          crossOrigin="anonymous"
          autoPlayAfterSrcChange={false}
          src={post?.musicFile}
          onPlay={onPlayHandler}
          onPause={onPauseHandler}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
          autoPlay={false}
          ref={audioPlayer}
          layout="horizontal"
          showJumpControls={false}
          showSkipControls={true}
          timeFormat="auto"
          customProgressBarSection={[
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.CURRENT_TIME,
            // <span>0:00</span>,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          // customAdditionalControls={[]}
          customIcons={{
            play: (
              <Img
                className="playButton"
                type="icon"
                wd={iconSize}
                src={playPrimary}
              />
            ),
            previous: (
              <Img
                className="subIcon"
                type="icon"
                wd={iconSize}
                src={skipPrev}
              />
            ),
            next: (
              <Img
                className="subIcon"
                type="icon"
                wd={iconSize}
                src={skipNext}
              />
            ),
            volume: <Img type="icon" wd={iconSize} src={volume} />,
            volumeMute: <Img type="icon" wd={iconSize} src={mute} />,
            pause: <Img type="icon" wd={iconSize} src={pause} />,
          }}
          customControlsSection={[
            <div>
              <Img
                className="subIcon"
                type="icon"
                wd={iconSize}
                src={shuffle}
              />
              <Img className="subIcon" wd={iconSize} src={repeat} />
            </div>,
            RHAP_UI.VOLUME,
          ]}
        />
      </Grid>
    </Flex>
  );
};

export default MainAudioPlayer;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: var(--ec-gap2);
  @media (max-width: 880px) {
    .subIcon {
      display: none;
    }
    .playButton {
      margin-right: 2rem;
    }
    .rhap_time {
      display: none;
    }
  }

  // audio player classes
  .rhap_container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    line-height: 1;
    font-family: inherit;
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: #fff;
  }
  .rhap_container:focus:not(:focus-visible) {
    outline: 0;
  }
  .rhap_main {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 2.5fr 1fr;
  }

  .rhap_progress-section .rhap_main-controls {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .rhap_progress-section {
    display: flex;
    height: 100%;
    flex: 3 1 auto;
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
    background-color: #dddddd;
    border-radius: 2px;
  }

  .rhap_progress-filled {
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: #000000;
    border-radius: 2px;
  }

  .rhap_progress-indicator {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    width: 10px;
    height: 10px;

    margin-left: -5px;
    top: -3px;

    background: #000000;
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
