import React, { useEffect, useRef, useState } from "react";
import Flex from "../elem/Flex";
import styled from "styled-components";
import Img from "../elem/Img";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./MainAudioPlayer.css";
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
import { iconSize } from "../../GlobalStyle";
import {
  __PlayerTogglePlay,
  __playNext,
  __PlayPrevious,
} from "../../redux/slice/mainSlice";
import { CurrentMusic } from "../../model/PostModel";

import { useAppDispatch, useAppSelector } from "../../redux/config";
const MainAudioPlayer = () => {
  const audioPlayer = useRef<AudioPlayer>(null);
  const { post, isPlayingMain } =
    useAppSelector < CurrentMusic > ((state) => state.main.currentMusic);
  const dispatch = useAppDispatch();

  const onListenHandler = (e : Event) => {};
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
            src={post.postImg}
          />
          {/* flexColumn [title, profile] */}
          <Flex
            direction="column"
            align="flex-start"
            gap="var(--ec-gap1)"
            wd="none"
          >
            <div>{post.title}</div>
            {/* flexRow [profile img, nickname]*/}
            <Flex justify="flex-start" gap="var(--ec-gap2)" wd="none">
              <Img
                type="shadowProfile"
                wd="3rem"
                src={
                  post.mainProfileList &&
                  post.mainProfileList.length &&
                  post.mainProfileList[0].profileImg
                }
              />
              <div>
                {post.mainProfileList &&
                  post.mainProfileList.length &&
                  post.mainProfileList[0].nickname}
              </div>
            </Flex>
          </Flex>
        </Flex>

        {/* flex row right grid [music btns, music bar, volume control] */}
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          src={post.musicFile}
          onPlay={onPlayHandler}
          onPause={onPauseHandler}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
          autoPlay={false}
          onListen={onListenHandler}
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
            play: <Img type="icon" wd={iconSize} src={playPrimary} />,
            previous: <Img type="icon" wd={iconSize} src={skipPrev} />,
            next: <Img type="icon" wd={iconSize} src={skipNext} />,
            volume: <Img type="icon" wd={iconSize} src={volume} />,
            volumeMute: <Img type="icon" wd={iconSize} src={mute} />,
            pause: <Img type="icon" wd={iconSize} src={pause} />,
          }}
          customControlsSection={[
            <div>
              <Img type="icon" wd={iconSize} src={shuffle} />
              <Img type="icon" wd={iconSize} src={repeat} />
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
`;
