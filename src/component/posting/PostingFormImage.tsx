import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { imgTitleBoxSize } from "../../page/PostingPage";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { formSelector, __form } from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
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
          fc={theme.color.thirdText}
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
  const { $openModal } = useTypeModal();
  const imageTypeCheck = (file: File) => {
    if (file.type.split("/")[0] !== "image") {
      setText(defaultText());
      return $openModal({
        type: "alert",
        props: {
          message: "유효하지 않은 이미지 형식입니다.",
          type: "error",
        },
      });
    }
  };
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      imageTypeCheck(event.dataTransfer.files[0]);
      dispatch(
        __form({ postImg: URL.createObjectURL(event.dataTransfer.files[0]) })
      );
      setText(defaultText());
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      imageTypeCheck(event.target.files[0]);
      dispatch(__form({ postImg: URL.createObjectURL(event.target.files[0]) }));
      setText(defaultText());
    }
  };

  return (
    <Flex
      radius="20px 20px 0 0"
      className={props.className}
      hg="21rem"
      direction="column"
      overFlow="hidden"
    >
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
        <input
          style={{ lineHeight: 0 }}
          hidden
          ref={fileInputRef}
          type={"file"}
          accept="image/*"
          onChange={handleFileChange}
        />

        {postImg ? (
          <Img
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
            radius="20px 20px 0 0"
            wd={imgTitleBoxSize}
            hg="23rem"
            src={postImg}
          />
        ) : (
          text
        )}
      </ImageDragForm>
    </Flex>
  );
};

export default PostingFormImage;
const ImageDragForm = styled(StFlex)``;
