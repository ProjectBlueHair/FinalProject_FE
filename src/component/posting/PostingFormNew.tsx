import React, { useRef } from "react";
import styled from "styled-components";
import { imgAdd } from "../../asset/pic";
import useInput from "../../hook/useInput";
import { Form } from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import Span from "../elem/Span";

const PostingFormNew = () => {
  const titleInput = useInput("");
  const descriptionInput = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: Form = {
      contents: "contents",
      title: titleInput.value,
      postImg: `testRandomPost/1.jpg`,
      lyrics: "lyrics",
    };
  };

  const handleFileChange = (e: React.ChangeEvent) => {};
  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="row">
        <ImageUploadBox>
          <Img src={imgAdd} />
          <input
            hidden
            ref={inputRef}
            type={"file"}
            accept="audio/*"
            onChange={handleFileChange}
          />
        </ImageUploadBox>
        <Flex direction="column" gap="2rem">
          <label>
            <div>제목</div>
            <input {...titleInput} />
          </label>
          <label>
            <div>설명</div>
            <input {...descriptionInput} />
          </label>
          <button type="submit">Submit</button>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostingFormNew;
const ImageUploadBox = styled(StFlex)`
  width: 15rem;
  height: 15rem;
  border: 2px solid var(--ec-main-color);
  border-radius: 15px;
`;
