import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __getComment } from "../../../redux/slice/comment";
import { useSelector } from "react-redux";
import DetailUpDown from "./DetailCommentUpDown";
import DetailDeleteAndUpdate from "./DetailCommentDeleteAndUpdate";
import DetailCommentLike from "./DetailCommentLike";

const DetailCommentView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(__getComment(id));
  }, []);

  const mainCommentView = useSelector((state) => state.comment.comment);

  return (
    <div>
      {mainCommentView?.map((mcv) => (
        <DetailComTotal key={mcv.id}>
          <DetailComTopImg src={mcv.profileImg} />
          <DetailComTop>
            <DetailDeleteAndUpdate mcv={mcv} />
            <DetailCommentLike />
            <DetailComUpDown>
              <DetailUpDown mcv={mcv} />
            </DetailComUpDown>
          </DetailComTop>
        </DetailComTotal>
      ))}
    </div>
  );
};

export default DetailCommentView;

const DetailComTotal = styled.div`
  display: flex;
  width: 100%;
`;

const DetailComTopImg = styled.img`
  min-width: 4rem;
  height: 3.5rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

const DetailComTop = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 78rem;
`;

const DetailComUpDown = styled.div`
  button {
    margin-right: 1rem;
    background-color: transparent;
    border: transparent;
  }
`;
