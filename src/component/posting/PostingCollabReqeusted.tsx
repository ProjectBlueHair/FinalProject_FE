import React, { useEffect } from "react";
import {
  collaboApprove,
  CollaboRequestedFormSelector,
  postingErrorSelector,
  __cleanUp,
  __getAudios,
  __getCollaboRequested,
  __getPostInfo,
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
import Button from "../elem/Button";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Span from "../elem/Span";

const PostingCollaboRequested = () => {
  const { id, postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    batch(() => {
      dispatch(__getPostInfo(Number(postId)));
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
  const collaboRequestedForm = useAppSelector(CollaboRequestedFormSelector);
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
          <Div style={{ ...formStyle, height: "15rem" }}>
            <Span fc={theme.color.main}>{collaboRequestedForm.title}</Span>
            <Div>{collaboRequestedForm.explain}</Div>
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
          <Button btnType="basic" type="submit">
            승인하기
          </Button>
        </Flex>
      </Flex>
    </form>
    // <form onSubmit={handleSubmit}>
    //   <Flex gap="2.5rem" align="flex-start">
    //     <Flex wd="100%" direction="column" gap="2rem" align="flex-start">
    //       <div>설명</div>
    //       <div style={{ ...formStyle, height: "15rem", width: "70rem" }}>
    //         {collaboDescription}
    //       </div>
    //       <Flex justify="flex-end">
    //         <TextButton btnType="basic" type="submit">
    //           승인하기
    //         </TextButton>
    //       </Flex>
    //     </Flex>
    //   </Flex>
    // </form>
  );
};

export default PostingCollaboRequested;
