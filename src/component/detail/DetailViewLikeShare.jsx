import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { view, like, save, share, collaboPlus, report } from "../../asset/pic";
import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  __getDetail,
  __getUserInfo,
  __postLike,
} from "../../redux/slice/detailSlice";
import { useSelector } from "react-redux";

const DetailViewLikeShare = ({ detail }) => {
  const [likeView, setLikeView] = useState(detail?.isLiked);
  const [likeCount, setLikeCount] = useState(detail?.likeCount);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInformation = useSelector((state) => state.detail.userInfo.data);

  console.log(userInformation);
  useEffect(() => {
    if (detail?.isLiked === undefined) {
      return;
    } else {
      setLikeView(detail?.isLiked);
    }
    if (detail?.likeCount === undefined) {
      return;
    } else {
      setLikeCount(detail?.likeCount);
    }
  }, [detail?.isLiked, detail?.likeCount]);

  const onLikeClick = () => {
    dispatch(__postLike(id));
    if (likeView === false || likeCount == 0) {
      setLikeCount(Number(likeCount + 1));
    } else {
      setLikeCount(Number(likeCount - 1));
    }
    setLikeView(!likeView);
  };

  const onNoSign = () => {
    alert("로그인 해주세요!");
  };

  return (
    <DetailLikeShareLine>
      <div>
        <Img wd="2.5rem" src={view} style={{ color: "black" }} />
        <div>{detail?.viewCount}</div>
      </div>
      <div>
        {userInformation === undefined ? (
          <Img wd="2rem" src={like} onClick={onNoSign} />
        ) : (
          <button onClick={onLikeClick}>
            {likeView ? (
              // 임시로 like 쪽 색상 변경 불가능 해서
              <AiFillHeart style={{ fontSize: "2.3rem", color: "red" }} />
            ) : (
              <Img wd="2rem" src={like} />
            )}
          </button>
        )}

        <div>{likeCount}</div>
      </div>
      <div>
        <Img wd="3.5rem" src={save} />
        <div>보관함 추가</div>
      </div>
      <div>
        <Img wd="3.5rem" src={share} />
        <div>공유</div>
      </div>
      <div>
        <Img wd="3.5rem" src={report} />
        <div>신고</div>
      </div>
      <div style={{ marginLeft: "54rem" }}>
        <Img wd="3.5rem" src={collaboPlus} />
        <div>콜라보 하기</div>
      </div>
    </DetailLikeShareLine>
  );
};

export default DetailViewLikeShare;

const DetailLikeShareLine = styled.div`
  display: flex;
  margin: 20px auto 0;
  justify-content: flex-start;
  width: 120rem;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin: 0 1rem 0 1rem;
  }
  button {
    border: transparent;
    background-color: transparent;
  }
`;
