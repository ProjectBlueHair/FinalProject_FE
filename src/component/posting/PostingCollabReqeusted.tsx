import React, { useEffect } from "react";
import {
  collaboApprove,
  collaboDescriptionSelector,
  errorSelector,
  __cleanUp,
  __getAudios,
  __getCollaboRequested,
} from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import TextButton from "../elem/TextButton";
import { formStyle } from "./PostingForm";
import { useAppDispatch, useAppSelector } from "../../redux/config";

import { useNavigate, useParams } from "react-router-dom";
import { Response } from "../../model/ResponseModel";
import { PATH } from "../../Router";

const PostingCollaboRequested = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(__getCollaboRequested(Number(id)));
    return () => {
      dispatch(__cleanUp());
    };
  }, []);
  const collaboDescription = useAppSelector(collaboDescriptionSelector);
  const error = useAppSelector(errorSelector);
  if (error) {
    // alert(error);
    console.log(error);
    navigate(PATH.main);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    collaboApprove(Number(id))
      .then(({ data }: { data: Response }) => {
        if (data.customHttpStatus === 2000) {
          alert(data.message);
          navigate(`${PATH.detail}/${id}`);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => alert("err"));
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
