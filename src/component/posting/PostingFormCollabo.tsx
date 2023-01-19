import React, { useEffect } from "react";
import useInput from "../../hook/useInput";
import {
  collaboRequestDataSelector,
  collaboRequest,
  errorSelector,
  titleSelector,
  __cleanUp,
  __getAudios,
  __getPostInfo,
} from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import TextArea from "../elem/Textarea";
import TextButton from "../elem/TextButton";
import { formStyle } from "./PostingForm";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { CollaboForm } from "../../model/PostingModel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../Router";
import { batch } from "react-redux";

const PostingFormCollabo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(errorSelector);
  if (error) {
    alert(error);
    navigate(PATH.main);
  }

  useEffect(() => {
    batch(() => {
      dispatch(__getAudios(Number(id)));
      dispatch(__getPostInfo(Number(id)));
    });

    return () => {
      dispatch(__cleanUp());
    };
  }, []);

  const collaboRequestData = useAppSelector(collaboRequestDataSelector);
  const descriptionInput = useInput("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const collaboForm: CollaboForm = {
      contents: descriptionInput.value,
      musicPartList: collaboRequestData.audios.map((audio) => audio.part)
    };

    formData.append(
      "jsonData",
      new Blob([JSON.stringify(collaboForm)], { type: "application/json" })
    );

    const blobs = await Promise.all(
      collaboRequestData.audios.map(async (collabo) => {
        const response = await axios.get(collabo.src, { responseType: "blob" });
        return response.data;
      })
    );

    for (let i = 0; i < blobs.length; i++) {
      formData.append("musicFile", blobs[i]);
    }

    collaboRequest(formData, id!).then((data) => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2.5rem" align="flex-start">
        <Flex wd="100%" direction="column" gap="2rem" align="flex-start">
          <label>
            <div>설명</div>
            <TextArea
              style={{ ...formStyle, height: "15rem", width: "70rem" }}
              placeholder={"describe your music\n# for hash tag (eg. #rock)"}
              {...descriptionInput}
            />
          </label>
          <Flex justify="flex-end">
            <TextButton
              btnType="basic"
              disabled={
                descriptionInput.value !== "" &&
                collaboRequestData.audios.length !== 0
                  ? false
                  : true
              }
              type="submit"
            >
              콜라보요청하기
            </TextButton>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostingFormCollabo;
