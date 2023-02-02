import axios from "axios";
import React, { useEffect } from "react";
import { uploadFiles } from "../../dataManager/imageS3";
import useInput from "../../hook/useInput";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { CollaboForm, Form, NewPostForm } from "../../model/PostingModel";
import { Response } from "../../model/ResponseModel";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  collaboRequestDataSelector, formSelector,
  uploadNewPost, __cleanUp
} from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Span from "../elem/Span";
import TextArea from "../elem/Textarea";

export const formStyle = {
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "10px",
  width: "100%",
  height: "11rem",
  maxHeight: "none",
  fontSize: "1.4rem",
  padding: "6px 12px",
  backgroundColor: theme.color.rgbaBg2,
};

const PostingForm: React.FC<{ isEdit: boolean }> = (props) => {
  const descriptionInput = useInput("");
  const collaboInput = useInput("");

  const collaboRequestData = useAppSelector(collaboRequestDataSelector);
  const dispatch = useAppDispatch();
  const postForm = useAppSelector(formSelector.form);

  const { $openModal, $closeModal } = useTypeModal();

  useEffect(() => {
    return () => {
      console.log("posting form cleaning");
      dispatch(__cleanUp());
    };
  }, []);

  async function fetchBlob(url: string) {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!collaboRequestData.isValid) {
      $openModal({
        type: "alert",
        props: { message: "각 음원의 파트를 입력해 주세요 :)", type: "info" },
      });
      return;
    }
    $openModal({ type: "loading", props: "" });
    const form: Form = {
      contents: descriptionInput.value,
      collaboNotice: collaboInput.value,
      title: postForm.title,
      postImg: "",
    };
    const collaboForm: CollaboForm = {
      contents: "원곡자",
      musicPartList: collaboRequestData.audios.map((audio) => audio.part),
    };
    const formData = new FormData();
    const blobs = await Promise.all(
      collaboRequestData.audios.map(async (collabo) => {
        const response = await axios.get(collabo.src, {
          responseType: "blob",
        });
        return response.data;
      })
    );
    for (let i = 0; i < blobs.length; i++) {
      formData.append("musicFile", blobs[i]);
    }
    const imgBlob = postForm.postImg ? await fetchBlob(postForm.postImg) : null;

    const submitPost = async () => {
      const imgData = await uploadFiles(imgBlob);
      const newPostForm: NewPostForm = {
        requestCollaboRequestDto: collaboForm,
        requestPostDto: { ...form, postImg: imgData ? imgData.Location : null },
      };
      formData.append(
        "jsonData",
        new Blob([JSON.stringify(newPostForm)], { type: "application/json" })
      );
      const postData = await uploadNewPost(formData);
      return postData;
    };
    submitPost()
      .then(({ data }: { data: Response }) => {
        $closeModal();
        if (data.customHttpStatus === 2000) {
          $openModal({
            type: "alert",
            props: {
              message: "게시글이 작성되었습니다!",
              type: "confirm",
              to: "/",
            },
          });
        }
      })
      .catch((err) => {
        $closeModal();
        $openModal({
          type: "alert",
          props: { message: "" + err, type: "error" },
        });
      });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Flex align="flex-start" gap="1.5rem">
        <Flex
          direction="column"
          justify="flex-start"
          wd="75%"
          gap="2rem"
          pd="1.5rem 2rem"
          radius="20px"
          bg={theme.color.rgbaBg2}
        >
          <Div style={{ ...formStyle }}>
            <Span fc={theme.color.main}>설명</Span>
            <TextArea
              bg="transparent"
              placeholder={"음악에 대한 설명을 넣어주세요 (해시태그 예시 : #piano)"}
              {...descriptionInput}
            />
          </Div>
          <Div style={{ ...formStyle }}>
            <Span fc={theme.color.main}>콜라보 요청</Span>
            <TextArea
              bg="transparent"
              placeholder={"콜라보 요청에 대한 설명을 넣어주세요"}
              {...collaboInput}
            />
          </Div>
        </Flex>
        <Flex
          align="center"
          justify="flex-end"
          flex="1"
          bg={theme.color.rgbaBg2}
          pd="1.3rem"
          radius="20px"
        >
          <Button
            btnType="basic"
            disabled={
              postForm.title === "" || !collaboRequestData.audios.length
                ? true
                : false
            }
            type="submit"
          >
            업로드 하기
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostingForm;
