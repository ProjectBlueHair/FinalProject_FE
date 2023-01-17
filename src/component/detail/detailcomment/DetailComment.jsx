import React from "react";
import styled from "styled-components";
import DetailCommentView from "./DetailCommentView";

const DetailComment = () => {
  return (
    <div>
      <CommentWrite>
        <img />
        <CommentWriteBox>
          <input />
          <button>댓글</button>
        </CommentWriteBox>
      </CommentWrite>
      <DetailCommentView />
    </div>
  );
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
  width: 80rem;
  height: 3.5rem;
  margin-left: 1rem;
  border: 1px solid black;
  align-items: center;
  border-radius: 30px;
  input {
    width: 72rem;
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
