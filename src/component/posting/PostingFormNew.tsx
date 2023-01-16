import React, { useRef, useState } from "react";
import styled from "styled-components";
import { imgAdd } from "../../asset/pic";
import useInput from "../../hook/useInput";
import { useAppDispatch } from "../../redux/config";
import {
  AudioInfo,
  Form,
  __addNewAudio,
  __seekTo,
} from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import Span from "../elem/Span";

const PostingFormNew = () => {
  const titleInput = useInput("");
  const descriptionInput = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [src, setSrc] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form : Form =  { 
    //   title : 'title',
    //   contents : 'contents',
    //   postImg : file, 
    //   audios : files

    // }
 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const src = URL.createObjectURL(file)
    setSrc(src)


  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="row">
        <ImageUploadBox onClick={()=>{ inputRef.current?.click()}}>
          <Img  src={src==='' ? imgAdd : src}  />
          <input
            hidden
            ref={inputRef}
            type={"file"}
            accept="image/*"
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
  cursor: pointer;
  width: 15rem;
  height: 15rem;
  border: 2px solid var(--ec-main-color);
  border-radius: 15px;
`;
