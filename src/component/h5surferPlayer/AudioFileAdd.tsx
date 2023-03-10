import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch } from "../../redux/config";
import { __addNewAudio } from "../../redux/slice/h5surferSlice";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Span from "../elem/Span";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./AudioStyleConstants";
interface NewAudio {
  url: string;
  duration: number;
}
const AudioFileAdd: React.FC<{ isCollabo?: boolean }> = (props) => {

  const dispatch = useAppDispatch();

  const [text, setText] = useState(defaultText());
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { $openModal } = useTypeModal();
  

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      files && dispatchAudios(files);
    },
    []
  );
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      files && dispatchAudios(files);
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setText(alertText());
    },
    []
  );
  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      setText(defaultText());
    },
    []
  );
  return (
    <AudioDragForm
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Flex
        type="audioBar"
        isNewAudio={false}
        isFormAudio={true}
        radius={AUDIO_BAR_RADIUS}
        hg={`${AUDIO_BAR_HEIGHT}px`}
      >
        <Flex flex="1">
          <input
            hidden
            ref={fileInputRef}
            type={"file"}
            accept="audio/wav"
            multiple
            onChange={handleFileChange}
          />
          {text}
        </Flex>
      </Flex>
    </AudioDragForm>
  );
  function defaultText() {
    return (
      <Flex direction="column" gap="0.5rem">
        <div>????????? ??? ???????????? ????????? ??????????????????</div>
        <Div
          onClick={() => {
            fileInputRef.current?.click();
          }}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
          fc={theme.color.thirdText}
        >
          ?????? ???????????? ?????? ????????????
          <Span>(?????? .wav ????????? ???????????????.)</Span>
        </Div>
        {props.isCollabo ? (
          <Div>????????? ????????? ???????????? ?????? ?????? ????????? ???????????????.</Div>
        ) : null}
      </Flex>
    );
  }
  function alertText() {
    return (
      <Span fc="var(--ec-main-color)" fs="2.2rem">
        DROP HERE !
      </Span>
    );
  }
  async function dispatchAudios(files: FileList) {
    if (files && files.length > 0) {
      const arr = [] as NewAudio[];
      for (let i = 0; i < files.length; i++) {
        typeCheck(files[i]);
        arr.push((await getInputAudioData(files[i])) as NewAudio);
      }
      dispatch(__addNewAudio(arr));
      setText(defaultText());
    }
    function typeCheck(file: File) {
      const type = file.type.split("/")[1];
      if (type !== "wav" && type !== "x-wav") {
        setText(defaultText());
        return $openModal({
          type: "alert",
          props: {
            message: "???????????? ?????? ????????? ???????????????.",
            type: "error",
          },
        });
      }
    }
    function getInputAudioData(file: File) {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.onloadedmetadata = () => {
          resolve({ url: url, duration: audio.duration });
        };
      });
    }
  }
};

export default AudioFileAdd;
const AudioDragForm = styled(StFlex)`
  margin: 1.5rem 0;
`;
