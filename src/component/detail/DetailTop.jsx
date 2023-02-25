import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { like, redLike, view } from "../../asset/pic";
import { getCookies } from "../../dataManager/cookie";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { __getDetail, __postLike } from "../../redux/slice/detailSlice";
import { __cleanUp, __getAudios } from "../../redux/slice/postingSlice";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import Img from "../elem/Img";
import PostingAudioBars from "../posting/AudioWaveSurferList";
import PostingTotalPlay from "../posting/AudioH5player";
import DetailDayAndFollow from "./DetailDayAndFollow";
import DetailRecomment from "./DetailRecomment";

const DetailTop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const acToken = getCookies("accesstoken");
  const detail = useSelector((state) => state.detail.detail.data);
  const [likeView, setLikeView] = useState(detail?.isLiked);
  const [likeCount, setLikeCount] = useState(detail?.likeCount);
  const { $openModal } = useTypeModal();
  useEffect(() => {
    dispatch(__getDetail(id));
    dispatch(__getAudios(id));
    return () => {
      dispatch(__cleanUp());
    };
  }, [id]);
  // 뷰숫자, 좋아요 숫자, 제목, 내용, 배경이미지파일 (+ 작성일 추가)
  // const detail = useSelector((state) => state.detail.detail.data)
  // 각 페이지 음악파일(props작업 끝)
  // const detailMusic = useSelector((state) => state.detail.music.data);
  // }, []);

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
    if (likeView === false || likeCount === 0) {
      setLikeCount(Number(likeCount + 1));
    } else {
      setLikeCount(Number(likeCount - 1));
    }
    setLikeView(!likeView);
  };

  const onNoSign = () => {
    $openModal({
      type: "alert",
      props: {
        message: "로그인이 필요한 페이지 (기능) 입니다.",
        type: "error",
      },
    });
  };

  return (
    <PlayTop>
      <DetailTopView imgs={detail?.postImg}>
        <DetailTopLeft>
          <DetailTopImg src={detail?.postImg} />
          <DetailTopDown>
            <h1>{detail?.title}</h1>
            <div style={{ color: "rgba(0,0,0,0.4)" }}>{detail?.createdAt}</div>
            <DetailRowDiv>
              <Img wd="2rem" src={view} style={{ marginRight: "10px" }} />
              <div>{detail?.viewCount}</div>
            </DetailRowDiv>
            <DetailRowDiv>
              {acToken === undefined ? (
                <Img
                  wd="2.1rem"
                  src={like}
                  onClick={onNoSign}
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                />
              ) : (
                <button onClick={onLikeClick}>
                  {likeView ? (
                    <Img
                      wd="2rem"
                      src={redLike}
                      style={{ marginRight: "1rem", cursor: "pointer" }}
                    />
                  ) : (
                    <Img
                      wd="2rem"
                      src={like}
                      style={{ marginRight: "1rem", cursor: "pointer" }}
                    />
                  )}
                </button>
              )}
              <div style={{ width: "1.3rem" }}>{likeCount}</div>
            </DetailRowDiv>
          </DetailTopDown>
        </DetailTopLeft>
        <DetailTopRight>
          <PostingTotalPlay />
          <br />
          <PostingAudioBars />
        </DetailTopRight>
      </DetailTopView>
      <DetailBottom>
        <DetailDayAndFollow detail={detail} />
        <DetailRecomment detail={detail} paramsID={id} />
      </DetailBottom>
    </PlayTop>
  );
};

export default DetailTop;

const PlayTop = styled.div`
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DetailTopView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  gap: 1.5rem;
  background-image: linear-gradient(
      rgba(240, 240, 240, 0.7),
      rgba(255, 255, 255, 1)
    ),
    url(${(props) => props.imgs});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%, 50%;
`;

const DetailTopLeft = styled.div`
  width: 15%;
  height: 100%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
`;

const DetailTopImg = styled.img`
  width: 100%;
  height: 18rem;
  border: 1px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  z-index: 3;
`;

const DetailTopDown = styled.div`
  border-radius: 20px;
  position: relative;
  top: -15px;
  height: 70%;
  z-index: 10;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  word-wrap: break-word;
  h1 {
    margin-bottom: 15px;
  }
`;

const DetailRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  button {
    border: transparent;
    background-color: transparent;
  }
`;

const DetailTopRight = styled.div`
  width: 90%;
  height: 400px;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DetailBottom = styled.div`
  margin: 10px auto 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
