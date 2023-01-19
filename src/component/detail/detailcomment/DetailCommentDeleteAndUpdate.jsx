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

const DetailDeleteAndUpdate = ({ mcv }) => {
  const [comUpdate, setcomUpdate] = useState(false);
  const [comUpdateInput, setComUpdateInput] = useState(mcv.contents);
  const dispatch = useDispatch();
  const { id } = useParams();
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
          ) : (
            <>
              <button onClick={onComUpdateNo}>수정</button>
              <button onClick={() => onComDelete(mcv.id)}>삭제</button>
            </>
          )}
        </DetailComHeader>
        <DetailComContent>
          <div>{mcv?.contents}</div>
        </DetailComContent>
      </div>
    );
  } else {
    return (
      <div>
        <DetailComHeader>
          <div>{mcv?.nickname}</div>
          <button
            onClick={() => onComUpdateYes(mcv.id)}
            style={{ width: "9rem" }}
          >
            수정하기
          </button>
        </DetailComHeader>
        <DetailComContent>
          <div>
            <input
              type="text"
              name="comUpdate"
              value={comUpdateInput}
              onChange={onChangeComUpdate}
            />
          </div>
        </DetailComContent>
      </div>
    );
  }
};

export default DetailDeleteAndUpdate;

const DetailComHeader = styled.div`
  display: flex;
  div {
    width: 66rem;
    /* margin-top: 0.5rem; */
  }
  button {
    border: 1px solid transparent;
    margin-right: 1rem;
    background-color: #ff4d00;
    border-radius: 1rem;
    height: 2.5rem;
    width: 4rem;
    padding: 0.3rem;
    color: white;
  }
`;

const DetailComContent = styled.div`
  width: 75rem;
  margin-top: -10px;
  span {
    display: flex;
    align-items: center;
  }
  input {
    border: transparent;
    border-bottom: 1px solid black;
    width: 68rem;
  }
`;
