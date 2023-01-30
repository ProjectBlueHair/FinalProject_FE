import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../../elem/Img";
import { more } from "../../../asset/pic";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getComment, __postCommentSub } from "../../../redux/slice/comment";
import DetailCommentSubDeleteUpdate from "./DetailCommentSubDeleteUpdate";
import { useSelector } from "react-redux";
import { __getUserInfo } from "../../../redux/slice/detailSlice";
import DetailCommentSubLike from "./DetailCommentSubLike";
import useTypeModal from "../../../modal/hooks/useTypeModal";

const DetailCommentSub = ({ mcv }) => {
  const [comSubV, setComSubV] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { $openModal, $closeModal } = useTypeModal();
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
      $openModal({
        type: "alert",
        props: {
          message: "댓글을 입력해 주세요.",
          type: "info",
        },
      });
    } else {
      await dispatch(__postCommentSub(sub));
      dispatch(__getComment(id));
      setComSubV("");
    }
  };

  const MypageMove = (name) => {
    navigate(`/mypage/${name}`);
  };
  return (
    <DetailSubView>
      {mcv.replyList?.map((re) => (
        <DetailComSubTotal key={re.id}>
          <DetailComTopSubImg
            src={re.profileImg}
            onClick={() => MypageMove(re.nickname)}
          />
          <DetailComSubTop>
            <DetailCommentSubDeleteUpdate re={re} />
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
            <button onClick={onClickComSub}>댓글</button>
          </div>
        </SubCommentWrite>
      )}
    </DetailSubView>
  );
};
export default DetailCommentSub;

const DetailSubView = styled.div`
  animation: Updown;
  animation-duration: 0.5s;
  @keyframes Updown {
    0% {
      transform: scaleY(0);
      transform-origin: 100% 0%;
    }
    100% {
      transform: scaleY(1);
      transform-origin: 100% 0%;
    }
  }
`;

// 대댓글 각각 div
const DetailComSubTotal = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
`;

// 대댓글 이미지
const DetailComTopSubImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 70%;
  margin-right: 1rem;
`;

// 대댓글 우측 div
const DetailComSubTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

// 대댓글 input 부분
const SubCommentWrite = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  div {
    display: flex;
    align-items: center;
    width: 95%;
    height: 3rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
  input {
    width: 93%;
    border: transparent;
    background-color: transparent;
    padding-left: 1rem;
    margin-left: 1rem;
  }
  button {
    color: #ff4d00;
    border: transparent;
  }
`;
