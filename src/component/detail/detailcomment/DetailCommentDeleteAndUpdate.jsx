import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  __deleteComment,
  __getComment,
  __putComment,
} from "../../../redux/slice/comment";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";
import DetailCommentLike from "./DetailCommentLike";
import useToggleOutSideClick from "../../../modal/hooks/useToggleOutSideClick";

const DetailDeleteAndUpdate = ({ mcv }) => {
  const [comUpdate, setcomUpdate] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(mcv.contents);
  const [contentOpen, setContentOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const moreRef = useRef(null);

  useToggleOutSideClick(moreRef, setContentOpen);
  // 삭제
  const onComDelete = async (comId) => {
    await dispatch(__deleteComment(comId));
    dispatch(__getComment(id));
  };
  // 유저 정보
  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  // 수정
  const onChangeComUpdate = (e) => {
    const upInput = e.target.value;
    setComUpdateInput(upInput);
  };
  const onComUpdateNo = () => {
    setcomUpdate(true);
    setContentOpen(false);
  };
  const onComUpdateYes = async (comID) => {
    await dispatch(__putComment({ comID, comUpdateInput }));
    dispatch(__getComment(id));
    setcomUpdate(false);
  };

  if (comUpdate === false) {
    return (
      <div>
        <DetailComHeader>
          <div>{mcv?.nickname}</div>
          {userInformation?.nickname !== mcv?.nickname ? (
            ""
          ) : contentOpen ? (
            <span>
              <Img
                wd="2rem"
                src={more}
                onClick={() => setContentOpen(!contentOpen)}
              />
              <MoreBtn ref={moreRef}>
                <button onClick={onComUpdateNo}>수정</button>
                <button onClick={() => onComDelete(mcv.id)}>삭제</button>
              </MoreBtn>
            </span>
          ) : (
            <Img
              wd="2rem"
              src={more}
              onClick={() => setContentOpen(!contentOpen)}
            />
          )}
        </DetailComHeader>
        <DetailComContent>
          <div>{mcv?.contents}</div>
        </DetailComContent>
        <DetailCommentLike mcv={mcv} />
      </div>
    );
  } else {
    return (
      <div>
        <DetailComHeader>
          <div>{mcv?.nickname}</div>
        </DetailComHeader>
        <DetailComContent>
          <input
            type="text"
            name="comUpdate"
            value={comUpdateInput}
            onChange={onChangeComUpdate}
          />
        </DetailComContent>
        <ContentBTW>
          <DetailCommentLike mcv={mcv} />
          <button
            onClick={() => onComUpdateYes(mcv.id)}
            style={{
              marginRight: "10px",
              border: "transparent",
              borderBottom: "1px solid #ff4d00",
              padding: "1px 3px",
            }}
          >
            수정하기
          </button>
        </ContentBTW>
      </div>
    );
  }
};

export default DetailDeleteAndUpdate;

// 닉네임과 수정 삭제 버튼 부분
const DetailComHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  span {
    width: 2rem;
    height: 2rem;
  }
`;

// 댓글 내용 부분
const DetailComContent = styled.div`
  width: 100%;
  margin: 5px auto;
  div {
    width: 99%;
  }
  // 수정 input
  input {
    border: transparent;
    background-color: transparent;
    border-bottom: 1px solid black;
    width: 99%;
    margin-right: 10px;
    margin-top: 5px;
  }
`;

const ContentBTW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreBtn = styled.div`
  background-color: white;
  width: 7rem;
  height: 7rem;
  border: 1px solid #ff4d00;
  border-radius: 10px;
  position: relative;
  right: 0px;
  top: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    border: 1px solid transparent;
    background-color: transparent;
    width: 4rem;
    :hover {
      border: transparent;
      border-bottom: 1px solid #ff4d00;
      width: 30px;
    }
  }
`;
