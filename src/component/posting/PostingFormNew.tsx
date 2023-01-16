import React, { useRef, useState } from "react";
import styled from "styled-components";
import { imgAdd } from "../../asset/pic";
import useInput from "../../hook/useInput";
import { useAppDispatch } from "../../redux/config";
import { Form, AudioData } from "../../model/PostingModel";
import {
  collaboAudioSelector,
  collaboRequest,
  uploadPost,
  __typeTitle,
} from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import Span from "../elem/Span";
import { useAppSelector } from "../../redux/config";
import { titleSelector } from "../../redux/slice/postingSlice";
import { uploadFiles } from "../../dataManager/imageS3";
const PostingFormNew = () => {
  const descriptionInput = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<{ file: File | null; url: string }>({
    file: null,
    url: "",
  });

  const IMG_BOX_RADIUS = "15px";
  const IMG_RADIUS = "13px";
  const title = useAppSelector(titleSelector);
  const collaboAudios = useAppSelector(collaboAudioSelector);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //게시글 작성 요청
    const form: Form = {
      contents: descriptionInput.value,
      title: title,
      postImg: "",
    };

    //콜라보요청
    const formData = new FormData();
    formData.append("jsonData", JSON.stringify({ contents: "콜라보해요" }));
    for (let i = 0; i < collaboAudios.length; i++) {
      formData.append("musicFile", collaboAudios[i].file);
    }

    image.file
      ? uploadFiles(image.file)
          .then((data) => {
            console.log("data location", data.Location);
            return data.Location;
          })
          .then((data) => {
            uploadPost({ ...form, postImg: data }).then((data) => {
              console.log("data1", data);
            });
          })
          // .then((data) => {
          //   console.log("data2", data);
          //   // collaboRequest(formData, 1);
          // })
          .catch((err) => console.log(err))
      : uploadPost(form)
          .then((data) => {
            console.log("data3", data);
            // collaboRequest(formData, 1);
          })
          .then((data) => {
            console.log("data4", data);
          })
          .catch((err) => console.log(err));

    //1. 이미지 s3에 업로드 2. 게시글 업로드 3. 콜라보리퀘스트 post 4. navigatef to main
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
      <Flex direction="row">
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
        <Flex direction="column" gap="2rem">
          <label>
            <div>제목</div>
            <input
              value={title}
              placeholder="Type here"
              onChange={handleTitleChange}
            />
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
const ImageUploadBox = styled(StFlex)<{ radius: string }>`
  cursor: pointer;
  width: 15rem;
  height: 15rem;
  border: 2px solid var(--ec-main-color);
  border-radius: ${({ radius }) => radius};
`;
