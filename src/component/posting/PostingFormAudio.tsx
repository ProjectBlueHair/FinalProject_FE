import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch } from "../../redux/config";
import { __addNewAudio } from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Span from "../elem/Span";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./PostingAudioBars";

const PostingFormAudio: React.FC<{ isCollabo: boolean }> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultText = () => {
    return (
      <Flex direction="column" gap="0.5rem">
        <div>드래그 앤 드롭으로 악기를 추가해주세요</div>
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
          또는 클릭해서 파일 추가하기
          <Span>(현재 .wav 형식만 가능합니다.)</Span>
        </Div>
        {props.isCollabo ? (
          <Div>업로드 후에는 원곡자의 음원 재생 길이에 맞춰집니다.</Div>
        ) : null}
      </Flex>
    );
  };
  const alertText = () => {
    return (
      <Span fc="var(--ec-main-color)" fs="2.2rem">
        DROP HERE !
      </Span>
    );
  };
  const [text, setText] = useState(defaultText());
  const dispatch = useAppDispatch();
  const { $openModal } = useTypeModal();
  const typeCheck = (file: File) => {
    const type = file.type.split("/")[1];
    if (type !== "wav" && type !== "x-wav") {
      setText(defaultText());
      return $openModal({
        type: "alert",
        props: {
          message: "유효하지 않은 오디오 형식입니다.",
          type: "error",
        },
      });
    }
  };
  const getAudioData = (file: File) => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        resolve({ url: url, duration: audio.duration });
      };
    });
  };
  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files) {
        const files = event.dataTransfer.files;
        console.log("files", files);
        const arr = [];
        for (let i = 0; i < files.length; i++) {
          typeCheck(files[i]);
          arr.push(await getAudioData(files[i]));
        }
        dispatch(__addNewAudio(arr));
        setText(defaultText());
      }
    },
    []
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        typeCheck(files[i]);
        arr.push(await getAudioData(files[i]));
      }
      dispatch(__addNewAudio(arr));
      setText(defaultText());
    }
  };

  return (
    <AudioDragForm
      onDrop={handleDrop}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setText(alertText());
      }}
      onDragLeave={(event: React.DragEvent<HTMLDivElement>) => {
        setText(defaultText());
      }}
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
};

export default PostingFormAudio;
const AudioDragForm = styled(StFlex)``;
