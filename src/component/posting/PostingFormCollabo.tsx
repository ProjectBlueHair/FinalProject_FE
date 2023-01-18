import React from "react";
import useInput from "../../hook/useInput";
import { collaboAudioSelector } from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import TextArea from "../elem/Textarea";
import TextButton from "../elem/TextButton";
import { formStyle } from "./PostingForm";
import { useAppSelector } from "../../redux/config";
import { CollaboForm } from "../../model/PostingModel";
import axios from "axios";

const PostingFormCollabo = () => {
  const collaboAudios = useAppSelector(collaboAudioSelector);

  const descriptionInput = useInput("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const collaboForm: CollaboForm = {
      contents: "string",
      musicPartList: ["string"],
    };

    formData.append(
      "jsonData",
      new Blob([JSON.stringify(collaboForm)], { type: "application/json" })
    );

    const blobs = await Promise.all(
      collaboAudios.map(async (collabo) => {
        const response = await axios.get(collabo.src, { responseType: "blob" });
        return response.data;
      })
    );

    for (let i = 0; i < blobs.length; i++) {
      formData.append("musicFile", blobs[i]);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2.5rem" align="flex-start">
        <Flex wd="none" direction="column" gap="2rem" align="flex-start">
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
              disabled={descriptionInput.value === "" ? true : false}
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
