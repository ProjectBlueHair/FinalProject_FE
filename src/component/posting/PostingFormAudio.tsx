import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/config";
import { __addNewAudio } from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./PostingAudioBars";

const PostingFormAudio = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("드래그 앤 드랍으로 음악을 추가하세요");
  const dispatch = useAppDispatch();
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("drop?");
    if (event.dataTransfer.files) {
      console.log("drop", event.dataTransfer.files);
      const files = event.dataTransfer.files;
      const arr: File[] = [];
      for (let i = 0; i < files.length; i++) {
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

      setText("드래그 앤 드랍으로 음악을 추가하세요");
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
        console.log("hi");
        setText("drop here !");
      }}
      onDragLeave={(event: React.DragEvent<HTMLDivElement>) => {
        // event.preventDefault()
        console.log("bye");
        setText("드래그 앤 드랍으로 음악을 추가하세요");
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
