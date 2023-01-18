import React, { useEffect, useState } from "react";
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

const DetailCommentSubDeleteUpdate = ({ re }) => {
  const dispatch = useDispatch();
  const [subUPDEL, setSubUPDEL] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(re.contents);
  const { id } = useParams();

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);
  console.log(userInformation);
  console.log(re);
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
  };
  // 수정 완료
  const onUpdateSubCom = async (comID) => {
    await dispatch(__putComment({ comID, comUpdateInput }));
    dispatch(__getComment(id));
    setSubUPDEL(false);
  };

  if (subUPDEL === false) {
    return (
      <div>
        <DetailComSubHeader>
          <div>{re.nickname}</div>
          {re?.nickname !== userInformation?.nickname ? (
            ""
          ) : (
            <>
              <button onClick={onSubUp}>수정</button>
              <button onClick={() => onSubCommentDelete(re.id)}>삭제</button>
            </>
          )}
        </DetailComSubHeader>
        <DetailComSubContent>
          <div>{re.contents}</div>
        </DetailComSubContent>
      </div>
    );
  } else {
    return (
      <div>
        <DetailComSubHeader>
          <div>{re.nickname}</div>
          <button
            style={{ width: "12rem" }}
            onClick={() => onUpdateSubCom(re.id)}
          >
            수정완료
          </button>
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
      </div>
    );
  }
};

export default DetailCommentSubDeleteUpdate;

const DetailComSubHeader = styled.div`
  display: flex;
  div {
    width: 85rem;
    margin-right: 1rem;
  }
  button {
    width: 5.5rem;
    height: 2.5rem;
    border-radius: 10px;
    color: white !important;
    border: transparent;
    background-color: #ff4d00 !important ;
  }
`;

const DetailComSubContent = styled.div`
  width: 71rem;
  margin-top: -10px;
  input {
    border: transparent;
    border-bottom: 1px solid black;
    width: 62rem;
  }
`;
