import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { loadingSelector, __addNewAudio } from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Span from "../elem/Span";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./PostingAudioBars";

const PostingFormImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultText = () => {
    return (
      <Flex direction="column">
        <div>드래그 앤 드랍으로 사진을 추가하세요</div>
        <div
          onClick={() => {
            fileInputRef.current?.click();
          }}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          또는 여기를 클릭해서 파일을 선택하세요.
        </div>
        <div>(현재 .wav 형식만 가능합니다.)</div>
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
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState(defaultText());
  const dispatch = useAppDispatch();
  const { $openModal, $closeModal } = useTypeModal();

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      console.log("files", files);
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        const type = files[i].type.split("/")[1];
        console.log("type", type);

        if (type !== "wav" && type !== "x-wav") {
          setText(defaultText());
          return alert("유효하지 않은 오디오 형식입니다.");
        }

        arr.push(URL.createObjectURL(files[i]));
      }
      dispatch(__addNewAudio(arr));
      setText(defaultText());
    }
  }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        const type = files[i].type.split("/")[1];
        if (type !== "wav" && type !== "x-wav") {
          setText(defaultText());
          return $openModal({
            type: "alert",
            props: { message: '유효하지 않은 오디오 형식입니다.', type: "error" },
          });
        }
        arr.push(URL.createObjectURL(files[i]));
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
        // event.preventDefault()
        console.log("bye");
        setText(defaultText());
      }}
    >
      <Flex
        type="audioBar"
        isNewAudio={true}
        radius={AUDIO_BAR_RADIUS}
        hg={AUDIO_BAR_HEIGHT}
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

export default PostingFormImage;
const AudioDragForm = styled(StFlex)``;
