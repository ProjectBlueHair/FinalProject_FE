import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __getComment, __postCommentSub } from "../../../redux/slice/comment";
import DetailCommentSubDeleteUpdate from "./DetailCommentSubDeleteUpdate";
import { useSelector } from "react-redux";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import DetailCommentSubLike from "./DetailCommentSubLike";

const DetailCommentSub = ({ mcv }) => {
  const [comSubV, setComSubV] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  const onChangeCommentSub = (e) => {
    const comSub = e.target.value;
    setComSubV(comSub);
  };

  const onClickComSub = async () => {
    const sub = { detailId: mcv?.id, id, comSubV };
    if (comSubV.trim() === "") {
      alert("댓글을 입력해 주세요");
    } else {
      await dispatch(__postCommentSub(sub));
      dispatch(__getComment(id));
      setComSubV("");
    }
  };
  return (
    <>
      {mcv.replyList?.map((re) => (
        <DetailComSubTotal key={re.id}>
          <DetailComTopSubImg src={re.profileImg} />
          <DetailComSubTop>
            <DetailCommentSubDeleteUpdate re={re} />
            <DetailCommentSubLike re={re} />
          </DetailComSubTop>
        </DetailComSubTotal>
      ))}

      {userInformation === undefined ? (
        ""
      ) : (
        <SubCommentWrite>
          <DetailComTopSubImg src={userInformation?.profileImg} />
          <div>
            <input
              type="text"
              name="commentSub"
              value={comSubV}
              onChange={onChangeCommentSub}
            />
            <button onClick={onClickComSub}>등록</button>
          </div>
        </SubCommentWrite>
      )}
    </>
  );
};
export default DetailCommentSub;

const DetailComSubTotal = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const DetailComTopSubImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

const DetailComSubTop = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 72rem;
`;

const SubCommentWrite = styled.div`
  display: flex;
  align-items: center;
  width: 75rem;
  height: 3rem;
  /* border: 1px solid black; */
  div {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    width: 75rem;
    height: 3rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
  input {
    width: 66rem;
    border: transparent;
    padding-left: 1rem;
    margin-left: 1rem;
  }
  button {
    color: #ff4d00;
  }
`;
