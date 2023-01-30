import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  formSelector,
  loadingSelector,
  __addNewAudio,
  __form,
} from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Span from "../elem/Span";

const PostingFormImage: React.FC<{ className?: string }> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultText = () => {
    return (
      <Flex direction="column" gap="1rem">
        <div>드래그 앤 드롭으로 이미지 넣기</div>
        <Div
          onClick={() => {
            fileInputRef.current?.click();
          }}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
          fc={theme.color.secondaryText}
        >
          또는 클릭해서 파일 추가하기
        </Div>
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
  const postImg = useAppSelector(formSelector.postImg);
  console.log("postImg", postImg);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      dispatch(__form(URL.createObjectURL(event.dataTransfer.files[0])));
      setText(defaultText());
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      dispatch(__form(URL.createObjectURL(files[0])));
      setText(defaultText());
    }
  };

  return (
    <ImageDragForm
      onDrop={handleDrop}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setText(alertText());
      }}
      onDragLeave={(event: React.DragEvent<HTMLDivElement>) => {
        console.log("bye");
        setText(defaultText());
      }}
    >
      {/* <Flex wd="none" className={props.className}> */}
      <input
        hidden
        ref={fileInputRef}
        type={"file"}
        accept="image/*"
        onChange={handleFileChange}
      />
      {text}
      {/* </Flex> */}
    </ImageDragForm>
  );
};

export default PostingFormImage;
const ImageDragForm = styled(StFlex)``;
