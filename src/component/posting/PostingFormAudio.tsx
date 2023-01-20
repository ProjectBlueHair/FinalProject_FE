import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/config";
import { __addNewAudio } from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Span from "../elem/Span";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./PostingAudioBars";

const PostingFormAudio = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultText = () => {
    return (
      <div>
        <div>드래그 앤 드랍으로 음악을 추가하세요</div>
        <div
          onClick={() => {
            fileInputRef.current?.click();
          }}
          style={{ textDecoration: "underline" }}
        >
          또는 여기를 클릭해서 파일을 선택하세요
        </div>
      </div>
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
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("drop?");
    if (event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      const arr: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const type = files[i].type.split("/")[1];
        if (type !== "wav") return alert("유효하지 않은 오디오 형식입니다.");
        console.log("drop file", files[i]);
        arr.push(files[i]);
      }
      setFiles(arr);
    }
  }, []);

  const handleFileChange = useCallback(() => {
    if (files) {
      console.log("file", files);
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        arr.push(URL.createObjectURL(files[i]));
      }
      dispatch(__addNewAudio(arr));

      setText(defaultText());
    }
  }, [files]);

  useEffect(() => {
    handleFileChange();
  }, [files, handleFileChange]); // handleFileChange는 안 넣어도 동작 함

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
            accept="audio/*"
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
