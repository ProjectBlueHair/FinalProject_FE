import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  __deleteComment,
  __getComment,
  __putComment,
} from "../../../redux/slice/comment";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import DetailCommentSubLike from "./DetailCommentSubLike";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";
import useToggleOutSideClick from "../../../modal/hooks/useToggleOutSideClick";

const DetailCommentSubDeleteUpdate = ({ re }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subUPDEL, setSubUPDEL] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(re.contents);
  const [contentSubOpen, setContentSubOpen] = useState(false);
  const { id } = useParams();
  const moreSubRef = useRef(null);

  useToggleOutSideClick(moreSubRef, setContentSubOpen);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  const onChangeSubComment = (e) => {
    const a = e.target.value;
    setComUpdateInput(a);
  };
  // 대댓글 삭제
  const onSubCommentDelete = async (comSubId) => {
    await dispatch(__deleteComment(comSubId));
    dispatch(__getComment(id));
  };
  // 수정/ 수정 확인 교체
  const onSubUp = () => {
    setSubUPDEL(true);
    setContentSubOpen(false);
  };
  // 수정 완료
  const onUpdateSubCom = async (comID) => {
    await dispatch(__putComment({ comID, comUpdateInput }));
    dispatch(__getComment(id));
    setSubUPDEL(false);
  };
  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };

  if (subUPDEL === false) {
    return (
      <SubAllDiv>
        <DetailComSubHeader>
          <div onClick={() => MypageMove(re.nickname)}>{re.nickname}</div>
          {re?.nickname !== userInformation?.nickname ? (
            ""
          ) : contentSubOpen ? (
            <span>
              <Img
                wd="2rem"
                src={more}
                onClick={() => setContentSubOpen(!contentSubOpen)}
              />
              <MoreSubBtn ref={moreSubRef}>
                <button onClick={onSubUp}>수정</button>
                <button onClick={() => onSubCommentDelete(re.id)}>삭제</button>
              </MoreSubBtn>
            </span>
          ) : (
            <Img
              wd="2rem"
              src={more}
              onClick={() => setContentSubOpen(!contentSubOpen)}
            />
          )}
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>{re.contents}</div>
        </DetailComSubContent>
        <DetailCommentSubLike re={re} />
      </SubAllDiv>
    );
  } else {
    return (
      <div>
        <DetailComSubHeader>
          <div>{re.nickname}</div>
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>
            <input
              type="text"
              name="subUpdate"
              value={comUpdateInput}
              onChange={onChangeSubComment}
            />
          </div>
        </DetailComSubContent>

        <ContentSubBTW>
          <DetailCommentSubLike re={re} />
          <button
            style={{
              marginRight: "10px",
              border: "transparent",
              borderBottom: "1px solid #ff4d00",
              padding: "1px 3px",
            }}
            onClick={() => onUpdateSubCom(re.id)}
          >
            수정하기
          </button>
        </ContentSubBTW>
      </div>
    );
  }
};

export default DetailCommentSubDeleteUpdate;

const SubAllDiv = styled.div`
  max-width: 100%;
`;

const DetailComSubHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
  span {
    width: 2rem;
    height: 2rem;
  }
`;

const DetailComSubContent = styled.div`
  width: 100%;
  div {
    width: 99%;
  }
  input {
    border: transparent;
    background-color: transparent;
    border-bottom: 1px solid black;
    width: 99%;
  }
`;

const MoreSubBtn = styled.div`
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

const ContentSubBTW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
