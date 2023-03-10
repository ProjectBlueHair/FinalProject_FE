import axios from "axios";
import React, { useEffect } from "react";
import { uploadFiles } from "../../dataManager/imageS3";
import useInput from "../../hook/useInput";
import useTypeModal from "../../modal/hooks/useTypeModal";
import {
  CollaboForm,
  PostingFormDto,
  DtoForPostingNew,
} from "./PostingModel.types";
import { Response } from "../../dataManager/ResponseModel.types";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { addedAudiosStateSelector } from "../../redux/slice/h5surferSlice";
import {
  formSelector,
  uploadNewPost,
  __cleanUpPost,
} from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Span from "../elem/Span";
import TextArea from "../elem/Textarea";
import SupportLinks from "./SupportLinks";

export const formStyle = {
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "10px",
  width: "100%",
  height: "50%",
  maxHeight: "none",
  fontSize: "1.4rem",
  padding: "6px 12px",
  backgroundColor: theme.color.rgbaBg2,
};

const PostingForm: React.FC<{ isEdit: boolean }> = (props) => {
  const descriptionInput = useInput("");
  const collaboInput = useInput("");

  const addedAudiosState = useAppSelector(addedAudiosStateSelector);
  console.log("addedAudiosState", addedAudiosState);

  const dispatch = useAppDispatch();
  const postForm = useAppSelector(formSelector.form);

  const { $openModal, $closeModal } = useTypeModal();

  console.log("collaboRequestData", addedAudiosState.partsAllValid);
  useEffect(() => {
    return () => {
      dispatch(__cleanUpPost());
    };
  }, []);

  async function fetchBlob(url: string) {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addedAudiosState.partsAllValid) {
      $openModal({
        type: "alert",
        props: {
          message: "??? ????????? ??????(????????? ??????)??? ????????? ????????? :)",
          type: "info",
        },
      });
      return;
    }
    $openModal({ type: "loading", props: "" });
    const form: PostingFormDto = {
      contents: descriptionInput.value,
      collaboNotice: collaboInput.value,
      title: postForm.title,
      postImg: "",
    };
    const collaboForm: CollaboForm = {
      contents: "?????????",
      audioPartList: addedAudiosState.addedAudios.map((audio) => audio.part),
    };
    const formData = new FormData();
    const blobs = await Promise.all(
      addedAudiosState.addedAudios.map(async (collabo) => {
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
      const newPostForm: DtoForPostingNew = {
        newAudiosDto: collaboForm,
        postingFormData: {
          ...form,
          postImg: imgData ? imgData.Location : null,
        },
      };
      console.log("newPostForm", newPostForm);

      formData.append(
        "jsonData",
        new Blob([JSON.stringify(newPostForm)], { type: "application/json" })
      );
      console.log("formData", formData);

      const postData = await uploadNewPost(formData);
      console.log("postData", postData);

      return postData;
    };
    submitPost()
      .then(({ data }: { data: Response }) => {
        $closeModal();
        if (data.customHttpStatus === 2000) {
          $openModal({
            type: "alert",
            props: {
              message: "???????????? ?????????????????????!",
              submessage:
                "???????????? ?????????????????? ????????? ????????? ????????? ??? ????????????.",
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
          <Div style={{ ...formStyle }}>
            <Span fc={theme.color.main}>??????</Span>
            <TextArea
              bg="transparent"
              placeholder={
                "????????? ?????? ????????? ??????????????? (???????????? ?????? : #piano)"
              }
              {...descriptionInput}
            />
          </Div>
          <Div style={{ ...formStyle }}>
            <Span fc={theme.color.main}>????????? ??????</Span>
            <TextArea
              bg="transparent"
              placeholder={"????????? ????????? ?????? ????????? ???????????????"}
              {...collaboInput}
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
              postForm.title === "" || !addedAudiosState.addedAudios.length
                ? true
                : false
            }
            type="submit"
          >
            ????????? ??????
          </Button>
        </Flex>
        <SupportLinks />
      </Flex>
    </form>
  );
};

export default PostingForm;
