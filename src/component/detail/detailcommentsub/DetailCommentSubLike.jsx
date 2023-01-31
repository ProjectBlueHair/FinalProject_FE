import React from "react";
import { useDispatch } from "react-redux";
import Img from "../../elem/Img";
import { like, redLike } from "../../../asset/pic";
import styled from "styled-components";
import { __getComment, __likeComment } from "../../../redux/slice/comment";
import { useParams } from "react-router-dom";
import { getCookies } from "../../../dataManager/cookie";
import useTypeModal from "../../../modal/hooks/useTypeModal";

const DetailCommentSubLike = ({ re }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { $openModal } = useTypeModal();
  const onNoSign = () => {
    $openModal({
      type: "alert",
      props: {
        message: "로그인이 필요한 페이지 (기능) 입니다.",
        type: "error",
      },
    });
  };
  const acToken = getCookies("accesstoken");

  const onLikeClick = async (comId) => {
    await dispatch(__likeComment(comId));
    dispatch(__getComment(id));
  };
  return (
    <CommentLikeTouch>
      {acToken ? (
        <button onClick={() => onLikeClick(re.id)}>
          {re?.isLiked ? (
            <Img wd="2.4rem" src={redLike} style={{ marginRight: "10px" }} />
          ) : (
            <Img wd="2rem" src={like} style={{ marginRight: "10px" }} />
          )}
        </button>
      ) : (
        <Img
          wd="2rem"
          src={like}
          onClick={onNoSign}
          style={{ marginRight: "10px" }}
        />
      )}
      <div>{re.likeCount}</div>
    </CommentLikeTouch>
  );
};

export default DetailCommentSubLike;

const CommentLikeTouch = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  button {
    background-color: transparent;
    border: transparent;
  }
`;
