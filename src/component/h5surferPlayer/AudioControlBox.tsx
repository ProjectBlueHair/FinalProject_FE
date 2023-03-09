import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Cancel from "../../asset/icon/Cancel";
import {
  collaboButton,
  muteButton,
  soloButton,
  unMuteButton
} from "../../asset/pic";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  __removeAudio, __setMute, __setPartForCollaboAudio, __setSolo,
  __setVolume
} from "../../redux/slice/h5surferSlice";
import { userSelector } from "../../redux/slice/userSlice";
import theme from "../../styles/theme";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import { StInput } from "../elem/Input";
import Span from "../elem/Span";
import { AUDIO_BAR_RADIUS } from "./AUDIO_BAR_GAP";
import { Wavesurfer } from "./H5SurferModel.types";

const AudioControlBox: React.FC<
  Wavesurfer & {
    index?: number;
  }
> = (props) => {

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
        {props.isAddedAudio ? (
          <PartInput
            value={props.audioSrcInfo.musicPart}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(
                __setPartForCollaboAudio({
                  part: e.target.value,
                  index: props.index,
                })
              );
            }}
            placeholder="Part"
          />
        ) : (
          <PartDiv>{props.audioSrcInfo.musicPart}</PartDiv>
        )}
        <Span
          style={{ flex: 1, overflow: "hidden" }}
          fw="300"
          fc="white"
          fs={"1.4rem"}
        >
          {props.audioSrcInfo.nickname || user.nickname}
        </Span>
        {props.isAddedAudio ? (
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
          wd={"2.2rem"}
          src={props.isMute ? muteButton : unMuteButton}
        />
        <Img
          onClick={() => dispatch(__setSolo(props.index))}
          wd={"2.2rem"}
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
          value={volume}
        />
      </Flex>
    </Flex>
  );
};

export default AudioControlBox;

const PartInput = styled(StInput).attrs({ maxLength: 6 })`
  border-radius: 10px;
  font-size: 1.2rem;
  width: 5.5rem;
  height: 2rem;
  text-align: center;
  border: 1px dashed white;
  color: white;
  max-width: 5.5rem;
  &::placeholder {
    color: #fff;
    font-weight: 300;
  }
`;
const PartDiv = styled(Flex)`
  background-color: white;
  border-radius: 10px;
  font-size: 1.2rem;
  width: 5.5rem;
  height: 2rem;
  color: var(--ec-main-color);
  box-sizing: border-box;
  line-height: none;
`;
