import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComment, __postComment } from "../../../redux/slice/comment";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import DetailCommentView from "./DetailCommentView";

const DetailComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(__getUserInfo());
    dispatch(__getComment(id));
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  const [mainContent, setMainContent] = useState("");
  const onChangeComment = (e) => {
    const firstContent = e.target.value;
    setMainContent(firstContent);
  };

  const onClickComment = async () => {
    if (
      mainContent === null ||
      mainContent === undefined ||
      mainContent.trim() === ""
    ) {
      return alert("댓글을 입력해 주세요");
    } else {
      await dispatch(__postComment({ id, mainContent }));
      dispatch(__getComment(id));
      setMainContent("");
    }
  };
  // if(commentLength.l)

  if (userInformation?.nickname === undefined) {
    return (
      <CommentTotal>
        <DetailCommentView />
      </CommentTotal>
    );
  } else {
    return (
      <CommentTotal>
        <CommentWrite>
          <img src={userInformation?.profileImg} />
          <CommentWriteBox>
            <input
              type="text"
              name="comment"
              value={mainContent}
              onChange={onChangeComment}
            />
            <button onClick={onClickComment}>댓글</button>
          </CommentWriteBox>
        </CommentWrite>
        <DetailCommentView />
      </CommentTotal>
    );
  }
};

export default DetailComment;

// 댓글 전체 div
const CommentTotal = styled.div`
  padding: 20px 0;
  width: 100%;
  margin-top: 20px;
  background-color: #f2f2f2;
  border-radius: 20px;
`;

// 댓글 입력 div
const CommentWrite = styled.div`
  width: 95%;
  margin: 0 auto 3rem;
  display: flex;
  img {
    border: 1px solid black;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 70%;
  }
`;

// 댓글 input감싸는 div
const CommentWriteBox = styled.div`
  display: flex;
  width: 100%;
  height: 3.5rem;
  margin-left: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  align-items: center;
  border-radius: 30px;
  input {
    width: 90%;
    height: 3rem;
    margin: 1rem 2rem;
    border: transparent;
    background-color: transparent;
  }
  button {
    border: transparent;
    background-color: transparent;
    color: #ff4d00;
  }
`;
