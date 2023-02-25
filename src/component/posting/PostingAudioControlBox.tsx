import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cancel from "../../asset/icon/Cancel";
import {
  collaboButton,
  muteButton,
  soloButton,
  unMuteButton
} from "../../asset/pic";
import { Audio } from "../../model/PostingModel";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  __removeAudio,
  __setCollaboPart,
  __setMute,
  __setSolo,
  __setVolume
} from "../../redux/slice/postingSlice";
import { userSelector } from "../../redux/slice/userSlice";
import theme from "../../styles/theme";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import { StInput } from "../elem/Input";
import Span from "../elem/Span";
import { AUDIO_BAR_RADIUS } from "./PostingAudioBars";
export interface Props {
  fs: string;
  wd: string;
  hg: string;
  radius: string;
}
export const partStyle: Props = {
  fs: "1.2rem",
  wd: "5.5rem",
  hg: "2rem",
  radius: "10px",
};

const PostingAudioControlBox: React.FC<
  Audio & {
    index?: number;
  }
> = (props) => {
  const BOX_NICK_FS = "1.4rem";
  const BOX_ICON_WD = "2.2rem";
  const dispatch = useAppDispatch();
  const [volume, setVolume] = useState(0.5);

  const user = useAppSelector(userSelector);

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = +e.target.value;

    if (newVolume) {
      setVolume(newVolume);
      dispatch(__setVolume({ index: props.index, volume: newVolume }));
    }
  };

  useEffect(() => {
    setVolume(props.volume || 0.5);
  }, [props.volume]);

  return (
    <Flex
      radius={AUDIO_BAR_RADIUS}
      pd="1rem 2.5rem"
      bg="var(--ec-main-color)"
      flex="0 0 20rem"
      hg="100%"
      direction="column"
      gap="0.5rem"
      overFlow="hidden"
    >
      <Flex gap="1rem" justify="flex-start">
        {props.isNewAudio && !props.isCollaboRequested ? (
          <PartInput
            {...partStyle}
            value={props.audioData.musicPart}
            onChange={(e) => {
              dispatch(
                __setCollaboPart({ part: e.target.value, index: props.index })
              );
            }}
            placeholder="Part"
          />
        ) : (
          <PartDiv {...partStyle}>{props.audioData.musicPart}</PartDiv>
        )}
        <Span
          style={{ flex: 1, overflow: "hidden" }}
          fw="300"
          fc="white"
          fs={BOX_NICK_FS}
        >
          {props.audioData.nickname || user.nickname}
        </Span>
        {props.isNewAudio && !props.isCollaboRequested ? (
          <Cancel
            onClick={() => dispatch(__removeAudio(props.index))}
            wd="1.4rem"
            // style={{ filter: theme.color.whiteFilter, cursor: "pointer" }}
            style={{ filter: theme.color.whiteFilter, cursor: "pointer" }}
          />
        ) : null}
      </Flex>

      <Flex align="center" gap="1rem" justify="flex-start">
        <Img
          onClick={() => dispatch(__setMute(props.index))}
          wd={BOX_ICON_WD}
          src={props.isMute ? muteButton : unMuteButton}
        />
        <Img
          onClick={() => dispatch(__setSolo(props.index))}
          wd={BOX_ICON_WD}
          src={props.isSolo ? soloButton : collaboButton}
        />
        <input
          style={{ width: "9rem" }}
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="0.985"
          step=".025"
          onChange={onVolumeChange}
          // defaultValue={volume}
          value={volume}
        />
      </Flex>
    </Flex>
  );
};

export default PostingAudioControlBox;
const PartInput = styled(StInput).attrs({ maxLength: 6 })<Props>`
  border: 1px dashed white;
  text-align: center;
  color: white;
  border-radius: ${({ radius }) => radius};
  height: ${({ hg }) => hg};
  max-width: ${({ wd }) => wd};
  font-size: ${({ fs }) => fs};
  &::placeholder {
    color: #fff;
    font-weight: 300;
    font-size: ${({ fs }) => fs};
  }
`;
const PartDiv = styled(Flex)<Props>`
  background-color: white;
  border-radius: ${({ radius }) => radius};
  height: ${({ hg }) => hg};
  width: ${({ wd }) => wd};
  font-size: ${({ fs }) => fs};
  color: var(--ec-main-color);
  box-sizing: border-box;
  line-height: none;
`;
