import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useParams } from "react-router-dom";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { Response } from "../../dataManager/ResponseModel.types";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  collaboApprove,
  CollaboRequestedFormSelector,
  __cleanUpPost,
  __getCollaboRequestedInfo,
  __getPostInfo,
} from "../../redux/slice/postingSlice";
import { PATH } from "../../Router";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Span from "../elem/Span";
import { formStyle } from "./PostingForm";

const PostingCollaboRequested = () => {
  const { id, postId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(__getPostInfo(Number(postId)));
      dispatch(__getCollaboRequestedInfo(Number(id)));

      // dispatch(__getAudios(Number(postId)))
      //   .then((data) => {
      //     if (data.type.split("/")[1]) {
      //       dispatch(__getCollaboRequested(Number(id)));
      //     }
      //   })
      //   .catch((err) => alert(err));
    });

    return () => {
      dispatch(__cleanUpPost());
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
          $openModal({
            type: "alert",
            props: {
              message: data.message,
              type: "confirm",
              to: `${PATH.detail}/${postId}`,
            },
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        $closeModal();
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
  );
};

export default PostingCollaboRequested;
