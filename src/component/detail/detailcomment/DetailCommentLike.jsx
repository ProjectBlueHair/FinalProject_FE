import React from "react";
import { useDispatch } from "react-redux";
import Img from "../../elem/Img";
import { like, redLike } from "../../../asset/pic";
import styled from "styled-components";
import { __getComment, __likeComment } from "../../../redux/slice/comment";
import { useParams } from "react-router-dom";
import { getCookies } from "../../../dataManager/cookie";
import useTypeModal from "../../../modal/hooks/useTypeModal";

const DetailCommentLike = ({ mcv }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { $openModal, $closeModal } = useTypeModal();
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
      {acToken === undefined ? (
        <Img wd="2rem" src={like} onClick={onNoSign} />
      ) : (
        <button onClick={() => onLikeClick(mcv.id)}>
          {mcv.liked ? (
            <Img wd="2.1rem" src={redLike} />
          ) : (
            <Img wd="2rem" src={like} />
          )}
        </button>
      )}
      <div style={{ marginLeft: "1rem " }}>{mcv.likeCount}</div>
    </CommentLikeTouch>
  );
};

export default DetailCommentLike;

const CommentLikeTouch = styled.div`
  display: flex;
  align-items: center;
  button {
    background-color: transparent;
    border: transparent;
  }
`;
