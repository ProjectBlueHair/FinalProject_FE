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
  if (userInformation?.nickname === undefined) {
    return (
      <div style={{ marginTop: "-30px" }}>
        <CommentWrite />
        <DetailCommentView />
      </div>
    );
  } else {
    return (
      <div>
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
      </div>
    );
  }
};

export default DetailComment;

const CommentWrite = styled.div`
  width: 85rem;
  margin: 3rem auto;
  display: flex;
  img {
    border: 1px solid black;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 70%;
  }
`;

const CommentWriteBox = styled.div`
  display: flex;
  width: 76rem;
  height: 3.5rem;
  margin-left: 1rem;
  border: 1px solid black;
  align-items: center;
  border-radius: 30px;
  input {
    width: 68rem;
    height: 3rem;
    margin: 1rem 2rem;
    border: transparent;
  }
  button {
    border: transparent;
    background-color: transparent;
    color: #ff4d00;
  }
`;
