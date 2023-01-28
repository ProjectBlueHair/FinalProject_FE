import React, { useEffect } from "react";
import {
  collaboApprove,
  collaboDescriptionSelector,
  postingErrorSelector,
  __cleanUp,
  __getAudios,
  __getCollaboRequested,
} from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import TextButton from "../elem/Button";
import { formStyle } from "./PostingForm";
import { useAppDispatch, useAppSelector } from "../../redux/config";

import { useNavigate, useParams } from "react-router-dom";
import { Response } from "../../model/ResponseModel";
import { PATH } from "../../Router";
import { batch } from "react-redux";
import useTypeModal from "../../modal/hooks/useTypeModal";

const PostingCollaboRequested = () => {
  const { id, postId } = useParams();
  console.log("id", id, "postId", postId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    batch(() => {
      dispatch(__getAudios(Number(postId)))
        .then((data) => {
          if (data.type.split("/")[1]) {
            dispatch(__getCollaboRequested(Number(id)));
          }
        })
        .catch((err) => alert(err));
    });

    return () => {
      dispatch(__cleanUp());
    };
  }, [id]);
  useEffect(() => {}, []);
  const collaboDescription = useAppSelector(collaboDescriptionSelector);
  const { $openModal, $closeModal } = useTypeModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    $openModal({ type: "loading", props: "" });
    collaboApprove(Number(id))
      .then(({ data }: { data: Response }) => {
        if (data.customHttpStatus === 2000) {
          $closeModal();
          alert(data.message);
          navigate(`${PATH.detail}/${postId}`);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        $closeModal();
        alert(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2.5rem" align="flex-start">
        <Flex wd="100%" direction="column" gap="2rem" align="flex-start">
          <div>설명</div>
          <div style={{ ...formStyle, height: "15rem", width: "70rem" }}>
            {collaboDescription}
          </div>
          <Flex justify="flex-end">
            <TextButton btnType="basic" type="submit">
              승인하기
            </TextButton>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostingCollaboRequested;
