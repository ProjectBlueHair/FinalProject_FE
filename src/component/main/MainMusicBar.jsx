import React from "react";
import Flex from "../elem/Flex";
import styled from "styled-components";
import Img from "../elem/Img";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./MainMusicBar.css";
import {
  playPrimary,
  repeat,
  shuffle,
  skipNext,
  skipPrev,
  volume,
} from "../../asset/pic";
import { iconSize } from "../../GlobalStyle";
const MainMusicBar = () => {
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
              src="testRandomPost/3.jpg"
            />
            {/* flexColumn [title, profile] */}
            <Flex
              direction="column"
              align="flex-start"
              gap="var(--ec-gap1)"
              wd="none"
            >
              <div>Voluptate recusanc</div>
              {/* flexRow [profile img, nickname]*/}
              <Flex justify="flex-start" gap="var(--ec-gap2)" wd="none">
                <Img
                  type="shadowProfile"
                  wd="3rem"
                  src="testRandomPost/2.jpg"
                />
                <div>nickname</div>
              </Flex>
            </Flex>
          </Flex>

          {/* flex row right grid [music btns, music bar, volume control] */}
          <AudioPlayer
            layout="horizontal"
            src="https://mybucket-mcho.s3.ap-northeast-2.amazonaws.com/music-test/piano.wav"
            showJumpControls={false}
            showSkipControls={true}
            timeFormat="mm:ss"
            customProgressBarSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
            ]}
            // customAdditionalControls={[]}
            customIcons={{
              play: <Img type="icon" wd={iconSize} src={playPrimary} />,
              previous: <Img type="icon" wd={iconSize} src={skipPrev} />,
              next: <Img type="icon" wd={iconSize} src={skipNext} />,
              volume: <Img type="icon" wd={iconSize} src={volume} />,
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

export default MainMusicBar;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: var(--ec-gap2);
`;
