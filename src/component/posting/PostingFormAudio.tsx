import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/config";
import { AudioInfo, Form, __addNewAudio } from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import PostingFormAudioControlBox from "./PostingAudioControlBox";
import { AUDIO_BAR_HEIGHT, AUDIO_BAR_RADIUS } from "./PostingAudioBars";

const PostingFormAudio = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("드래그 앤 드랍으로 음악을 추가하세요");
  const dispatch = useAppDispatch();
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("drop?");
    if (event.dataTransfer.files) {
      console.log("drop", event.dataTransfer.files);
      const file = event.dataTransfer.files[0];
      setFile(file);
    }
  }, []);

  const handleFileChange = useCallback(() => {
    if (file) {
      console.log("file", file);
      const url = URL.createObjectURL(file);
      const newAudio: AudioInfo = {
        nickname: "nickname",
        part: "part",
        src: url,
        file : file
      };
      dispatch(__addNewAudio(newAudio));

      setText("드래그 앤 드랍으로 음악을 추가하세요");
    }
  }, [file]);

  useEffect(() => {
    handleFileChange();
  }, [file, handleFileChange]); // handleFileChange는 안 넣어도 동작 함

  useEffect(() => {
    if (file) {
      //redux로 관리
      setFiles((prevFiles) => prevFiles?.concat(file));
    }
  }, [file]);
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
      <Flex type="audioBar" radius={AUDIO_BAR_RADIUS} hg={AUDIO_BAR_HEIGHT}>
        <PostingFormAudioControlBox isNew={true} isFormAudio={true} />
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
