import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imgAdd } from "../../asset/pic";
import useInput from "../../hook/useInput";
import { useAppDispatch } from "../../redux/config";
import { CollaboForm, Form } from "../../model/PostingModel";
import {
  collaboApprove,
  collaboRequestDataSelector,
  collaboRequest,
  errorSelector,
  uploadPost,
  __cleanUp,
  __typeTitle,
} from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import { useAppSelector } from "../../redux/config";
import { titleSelector } from "../../redux/slice/postingSlice";
import { uploadFiles } from "../../dataManager/imageS3";
import axios from "axios";
import Input from "../elem/Input";
import Span from "../elem/Span";
import TextArea from "../elem/Textarea";
import TextButton from "../elem/TextButton";
import CollaboSquare from "../../asset/icon/CollaboSquare";
import { Response } from "../../model/ResponseModel";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Router";
export const formStyle = {
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "10px",
  width: "50rem",
  height: "none",
  maxHeight: "none",
  fontSize: "1.4rem",
  padding: "6px 12px",
  marginTop: "1rem",
};
const IMG_BOX_RADIUS = "15px";
const IMG_RADIUS = "13px";

const PostingForm: React.FC<{ isEdit: boolean }> = (props) => {
  const [image, setImage] = useState<{ file: File | null; url: string }>({
    file: null,
    url: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionInput = useInput("");
  const collaboInput = useInput("");

  const title = useAppSelector(titleSelector);
  const collaboRequestData = useAppSelector(collaboRequestDataSelector);
  console.log("collaboRequestData", collaboRequestData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector(errorSelector);
  if (error) {
    alert(error);
    navigate(PATH.main);
  }
  useEffect(() => {
    return () => {
      console.log("posting form cleaning");
      dispatch(__cleanUp());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const collaboForm: CollaboForm = {
      contents: "collabo request from original author",
      musicPartList: collaboRequestData.audios.map((audio) => audio.part),
    };
    formData.append(
      "jsonData",
      new Blob([JSON.stringify(collaboForm)], { type: "application/json" })
    );

    const blobs = await Promise.all(
      collaboRequestData.audios.map(async (collabo) => {
        const response = await axios.get(collabo.src, {
          responseType: "blob",
        });
        return response.data;
      })
    );
    console.log("collabo Request blobs", blobs);
    for (let i = 0; i < blobs.length; i++) {
      formData.append("musicFile", blobs[i]);
    }
    uploadFiles(image.file)
      .then((data) => {
        console.log("aws s3 upload response", data);
        return data === null || undefined ? null : data.Location;
      })
      .then((data) => {
        const form: Form = {
          contents: descriptionInput.value,
          title: title,
          postImg: data,
        };
        console.log("form payload for  ", form);
        return uploadPost(form);
      })
      .then(({ data }) => {
        console.log("response from post uploading", data);
        return collaboRequest(formData, data.data);
      })
      .then(({ data }) => {
        console.log("response from collabo request", data.data);
        return collaboApprove(data.data);
      })
      .then(({ data }: { data: Response }) => {
        if (data.customHttpStatus === 2000) {
          alert("게시글이 작성되었습니다.");
          navigate(PATH.main);
        } else {
          alert(data.message);
        }
        console.log("collabo approve response", data);
      })
      .catch((err) => alert(err));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files![0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage({ file: imageFile, url: imageUrl });
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(__typeTitle(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2.5rem" align="flex-start">
        <ImageUploadBox
          radius={IMG_BOX_RADIUS}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {!image?.url ? (
            <Img wd="3rem" hg="3rem" cursor="pointer" src={imgAdd} />
          ) : (
            <Img
              type="radius" // 여기서 type 줄필요는 없는데 +img 태그랑 다른 객체 써야 +가 확대되는 문제 해결되서 사용
              cursor="pointer"
              src={image?.url}
              radius={IMG_RADIUS}
              wd="100%"
              hg="100%"
            />
          )}

          <input
            hidden
            ref={inputRef}
            type={"file"}
            accept="image/*"
            onChange={handleFileChange}
          />
        </ImageUploadBox>
        <Flex wd="none" direction="column" gap="2rem" align="flex-start">
          <label>
            <Flex justify="flex-start" gap="0.5rem">
              <Span fc="var(--ec-main-color)">*</Span>제목
            </Flex>
            <Input
              style={formStyle}
              value={title}
              placeholder="your music title"
              onChange={handleTitleChange}
            />
          </label>
          <label>
            <div>설명</div>
            <TextArea
              style={{ ...formStyle, height: "8rem" }}
              placeholder={"describe your music\n# for hash tag (eg. #rock)"}
              {...descriptionInput}
            />
          </label>
          <label>
            <Flex justify="flex-start" gap="0.5rem">
              <CollaboSquare wd="1.5rem"></CollaboSquare>콜라보 요청
            </Flex>
            <TextArea
              style={{ ...formStyle, height: "8rem" }}
              placeholder={"request to collaborators"}
              {...collaboInput}
            ></TextArea>
          </label>
          <Flex align="center" justify="flex-end" gap="2rem">
            <Span fc="var(--ec-main-color)">음원 파트를 입력해 주세요 :)</Span>
            <TextButton
              btnType="basic"
              disabled={
                title === "" || !collaboRequestData.isValid ? true : false
              }
              type="submit"
            >
              올리기
            </TextButton>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostingForm;
const ImageUploadBox = styled(StFlex)<{ radius: string }>`
  cursor: pointer;
  width: 15rem;
  height: 15rem;
  border: 2px solid var(--ec-main-color);
  border-radius: ${({ radius }) => radius};
`;
