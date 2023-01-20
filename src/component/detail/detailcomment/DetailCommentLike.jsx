import React from "react";
import { useDispatch } from "react-redux";
import Img from "../../elem/Img";
import { like, redLike } from "../../../asset/pic";
import styled from "styled-components";
import { __getComment, __likeComment } from "../../../redux/slice/comment";
import { useParams } from "react-router-dom";
import { getCookies } from "../../../dataManager/cookie";

const DetailCommentLike = ({ mcv }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const onNoSign = () => {
    alert("로그인이 필요합니다");
  };
  const acToken = getCookies("accesstoken");
  // 유저 정보

  const onLikeClick = async (comId) => {
    await dispatch(__likeComment(comId));
    dispatch(__getComment(id));
  };
  return (
    <CommentLikeTouch>
      {acToken === undefined ? (
        <Img
          wd="2rem"
          src={like}
          onClick={onNoSign}
          style={{ marginTop: "-5px" }}
        />
      ) : (
        <button onClick={() => onLikeClick(mcv.id)}>
          {mcv.liked ? (
            <Img wd="2.3rem" src={redLike} />
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
  margin-top: -0.5rem;
  button {
    margin-top: -0.5rem;
    background-color: transparent;
    border: transparent;
  }
`;
