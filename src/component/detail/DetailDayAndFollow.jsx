import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailFollow from "./DetailFollow";
import DetailComment from "./detailcomment/DetailComment";
import { __getDetailCollabo } from "../../redux/slice/detailSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import Img from "../elem/Img";
import { save, share, collaboPlus, report, kakaoIcon } from "../../asset/pic";
import { PATH } from "../../Router";
import StLink from "../elem/Link";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useTypeModal from "../../modal/hooks/useTypeModal";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import { useShare } from "../../hook/useShare";
export const kakaoJS = process.env.REACT_APP_KaKaoJSKey;

const DetailDayAndFollow = ({ detail }) => {
  const { id } = useParams();
  const [contentMore, setContentMore] = useState(false);
  const { $openModal } = useTypeModal();
  // 100줄 넘어가면 더보기 보이게 만듬
  const textLimit = useRef(100);
  const navigate = useNavigate();
  const shortContent = detail?.contents.slice(0, textLimit.current);
  const [shareOpen, setShareOpen] = useState(false);
  const onShare = useCallback(() => {
    setShareOpen(!shareOpen);
  });
  const shared = useRef(null);
  useToggleOutSideClick(shared, setShareOpen);
  const currentUrl = window.location.href;
  const urlShareClick = () => {
    $openModal({
      type: "alert",
      props: {
        message: "URL주소가 복사가 되었습니다!",
        type: "info",
      },
    });
  };
  // 카카오 공유 로직
  // kakao SDK import
  const status = useShare("https://developers.kakao.com/sdk/js/kakao.js");
  // kakao SDK 초기화
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJS);
      }
    }
  }, [status]);

  const kakaoShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "우연한 만남으로 시작되고 쌓이는 음악 콜라보 서비스",
        description: `제목 : ${detail?.title}`,
        imageUrl: detail?.postImg,
        link: {
          webUrl: currentUrl,
        },
      },
      itemContent: {
        profileText: "Oncounter",
        profileImageUrl:
          "https://velog.velcdn.com/images/koz8615/post/f9135d4e-b835-49d8-bc39-284c21ec504e/image.jpg",
      },
    });
  };

  const NotTouch = () => {
    $openModal({
      type: "alert",
      props: {
        message: "준비중인 페이지 (기능) 입니다.",
        type: "info",
      },
    });
  };

  return (
    <DetailLeftTotal>
      <DetailMiddleTop>
        <DetailShareLine>
          <div>
            <div onClick={NotTouch}>
              <Img wd="3rem" src={save} />
              <div>보관함 추가</div>
            </div>
            <div onClick={onShare} ref={shared}>
              <Img wd="3rem" src={share} />
              <div style={{ width: "30px" }}>공유</div>
              {shareOpen ? (
                <ShareDiv>
                  <FacebookShareButton url={currentUrl}>
                    <FacebookIcon
                      size={20}
                      round={true}
                      borderRadius={24}
                    ></FacebookIcon>
                  </FacebookShareButton>
                  <TwitterShareButton url={currentUrl}>
                    <TwitterIcon
                      size={20}
                      round={true}
                      borderRadius={24}
                    ></TwitterIcon>
                  </TwitterShareButton>
                  <LinkedinShareButton url={currentUrl}>
                    <LinkedinIcon
                      size={20}
                      round={true}
                      borderRadius={24}
                    ></LinkedinIcon>
                  </LinkedinShareButton>
                  <CopyToClipboard text={currentUrl}>
                    <URLShareBtn onClick={urlShareClick}>url</URLShareBtn>
                  </CopyToClipboard>
                  <button onClick={kakaoShare} id="kakaoShared">
                    <Img wd="2rem" src={kakaoIcon} />
                  </button>
                </ShareDiv>
              ) : (
                ""
              )}
            </div>
            <div onClick={NotTouch}>
              <Img wd="3rem" src={report} />
              <div>신고</div>
            </div>
          </div>
          <div>
            <div>
              <div onClick={() => navigate(`${PATH.collabo}/${id}`)}>
                <Img wd="3.5rem" src={collaboPlus} />
                <div>콜라보 하기</div>
              </div>
            </div>
          </div>
        </DetailShareLine>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {detail?.tagList.map((tag, index) => (
            <StLink to={`/tag/${tag}`} key={index}>
              <div style={{ color: "#ff4d00" }}># {tag}</div>
            </StLink>
          ))}
        </div>
        <div style={{ color: "#ff4d00", marginTop: "5px" }}>설명</div>
        <div style={{ marginTop: "5px" }}>
          <div>{contentMore ? detail?.contents : shortContent}</div>
          <div onClick={() => setContentMore(!contentMore)}>
            {detail?.contents?.length > shortContent?.length ? (
              contentMore ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <AiOutlineUp /> 간략히
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <AiOutlineDown /> 더보기
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div style={{ color: "#ff4d00", marginTop: "5px" }}>콜라보 요청</div>
        <div style={{ marginTop: "5px" }}>{detail?.collaboNotice}</div>
      </DetailMiddleTop>
      <div>
        <DetailFollow />
        <DetailComment />
      </div>
    </DetailLeftTotal>
  );
};

export default DetailDayAndFollow;

const DetailLeftTotal = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  margin: 1px;
  /* border: 1px solid black; */
  border-radius: 20px;
`;

const DetailShareLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const DetailMiddleTop = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #f2f2f2;
  padding: 10px 20px;
`;

const ShareDiv = styled.div`
  width: 70%;
  height: 3.5rem;
  border: 1px solid #ff4d00;
  position: relative;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  button {
    border: transparent;
    display: flex;
    align-items: center;
  }
  animation-name: shareBoxx;
  animation-duration: 0.5s;

  @keyframes shareBoxx {
    0% {
      transform: scaleX(0);
      transform-origin: 0% 0%;
    }
    100% {
      transform: scaleX(1);
      transform-origin: 0% 0%;
    }
  }
`;

const URLShareBtn = styled.button`
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 9px;
  padding-left: 3px;
  cursor: pointer;
  background-color: #ff4d00;
  &:hover {
    background-color: #e24400;
  }
`;
