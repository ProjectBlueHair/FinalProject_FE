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
import TextButton from "../elem/Button";
import { formStyle } from "./PostingForm";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { CollaboForm } from "../../model/PostingModel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../Router";
import { batch } from "react-redux";
import Span from "../elem/Span";
import useTypeModal from "../../modal/hooks/useTypeModal";

const PostingFormCollabo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(errorSelector);
  const { $openModal, $closeModal } = useTypeModal();
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
    $openModal({ type: "loading", props: "" });

    const formData = new FormData();

    const collaboForm: CollaboForm = {
      contents: descriptionInput.value,
      musicPartList: collaboRequestData.audios.map((audio) => audio.part),
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

    collaboRequest(formData, id!)
      .then((data) => {
        $closeModal();
        $openModal({
          type: "alert",
          props: {
            message: "콜라보 리퀘스트에 성공하셨습니다",
            type: "confirm",
            to: "/",
          },
        });
      })
      .catch((err) => {
        $closeModal();
        $openModal({ type: "alert", props: { message: err, type: "error" } });
      });
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
          <Flex align="center" justify="flex-end" gap="2rem">
            <Span fc="var(--ec-main-color)">
              각 음원의 파트를 입력해 주세요 :)
            </Span>
            <TextButton
              btnType="basic"
              disabled={
                descriptionInput.value === "" || !collaboRequestData.isValid
                  ? true
                  : false
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
