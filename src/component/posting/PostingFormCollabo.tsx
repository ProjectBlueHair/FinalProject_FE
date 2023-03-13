import axios from "axios";
import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useParams } from "react-router-dom";
import useInput from "../../hook/useInput";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { CollaboForm } from "./PostingModel.types";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { addedAudiosStateSelector } from "../../redux/slice/h5surferSlice";
import {
  collaboRequest,
  __cleanUpPost,
  __getPostInfo,
} from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Span from "../elem/Span";
import TextArea from "../elem/Textarea";
import { formStyle } from "./PostingForm";
import SupportLinks from "./SupportLinks";

const PostingFormCollabo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { $openModal, $closeModal } = useTypeModal();

  useEffect(() => {
    batch(() => {
      // dispatch(__getAudios(Number(id)));
      dispatch(__getPostInfo(Number(id)));
    });

    return () => {
      dispatch(__cleanUpPost());
    };
  }, [id]);

  const AddedAudiosState = useAppSelector(addedAudiosStateSelector);
  const descriptionInput = useInput("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    $openModal({ type: "loading", props: "" });

    const formData = new FormData();

    const collaboForm: CollaboForm = {
      contents: descriptionInput.value,
      audioPartList: AddedAudiosState.addedAudios.map((audio) => audio.part),
    };

    formData.append(
      "jsonData",
      new Blob([JSON.stringify(collaboForm)], { type: "application/json" })
    );

    const blobs = await Promise.all(
      AddedAudiosState.addedAudios.map(async (collabo) => {
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
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Flex align="flex-start" gap="1.5rem" hg="25rem">
        <Flex
          direction="column"
          justify="flex-start"
          flex="1"
          hg="100%"
          gap="2rem"
          pd="1.5rem 2rem"
          radius="20px"
          bg={theme.color.rgbaBg2}
        >
          <Div style={{ ...formStyle, height: "100%" }}>
            <Span fc={theme.color.main}>콜라보 요청</Span>
            <TextArea
              bg="transparent"
              placeholder={"업로드한 음악에 대한 설명을 넣어주세요"}
              {...descriptionInput}
            />
          </Div>
        </Flex>
        <Flex
          hg="100%"
          align="flex-start"
          bg={theme.color.rgbaBg2}
          pd="1.3rem"
          radius="20px"
          gap="2rem"
          wd="none"
        >
          <Button
            btnType="basic"
            disabled={
              descriptionInput.value === "" || !AddedAudiosState.partsAllValid
                ? true
                : false
            }
            type="submit"
          >
            콜라보 요청
          </Button>
        </Flex>
        <SupportLinks />
      </Flex>
    </form>
  );
};

export default PostingFormCollabo;
