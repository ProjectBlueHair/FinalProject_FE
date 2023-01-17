import React, { useRef, useState } from "react";
import styled from "styled-components";
import { imgAdd } from "../../asset/pic";
import useInput from "../../hook/useInput";
import { useAppDispatch } from "../../redux/config";
import { Form } from "../../model/PostingModel";
import {
  collaboApprove,
  collaboAudioSelector,
  collaboRequest,
  uploadPost,
  __typeTitle,
} from "../../redux/slice/postingSlice";
import Flex, { StFlex } from "../elem/Flex";
import Img from "../elem/Img";
import { useAppSelector } from "../../redux/config";
import { titleSelector } from "../../redux/slice/postingSlice";
import { uploadFiles } from "../../dataManager/imageS3";
import axios from "axios";
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
  console.log("collaboAudios", collaboAudios);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //게시글 작성 요청
    const form: Form = {
      contents: descriptionInput.value,
      title: title,
      postImg: null,
    };

    //콜라보요청
    const formData = new FormData();
    const jsonToString = JSON.stringify({
      contents: "lets collabo",
      musicPartList: ["string"],
    });
    formData.append(
      "jsonData",
      new Blob([jsonToString], { type: "application/json" })
    );

    const blobs = await Promise.all(
      collaboAudios.map(async (collabo) => {
        const response = await axios.get(collabo.src, { responseType: "blob" });
        return response.data;
      })
    );

    for (let i = 0; i < blobs.length; i++) {
      console.log("file -> ", blobs[i]);
      formData.append("musicFile", blobs[i]);
    }

    uploadFiles(image.file)
      .then((data) => {
        console.log("data location", data);
        return data === null || undefined ? null : data.Location;
      })
      .then((data) => {
        console.log("data1", data);

        return uploadPost({ ...form, postImg: data });
      })
      .then(({ data }) => {
        console.log("data2", data.data);
        return collaboRequest(formData, data.data);
      })
      .then(({ data }) => {
        console.log("data3", data);
        return collaboApprove(data.data);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
