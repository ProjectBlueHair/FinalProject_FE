import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";
import { facebook, insta, kakaoIcon, linkedIn, twitter } from "../../asset/pic";
import { apiClient } from "../../dataManager/interceptors";
import { getCookies } from "../../dataManager/cookie";
import { useShare } from "../../hook/useShare";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { __putDetailFollow } from "../../redux/slice/detailSlice";
import { PATH } from "../../Router";
import { __directMessage } from "../../redux/slice/chatSlice";
import Img from "../elem/Img";
export const kakaoJS = process.env.REACT_APP_KaKaoJSKey;

const MypageLeft = () => {
  const { nickname } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const { $openModal, $closeModal } = useTypeModal();
  const [myShare, setMyShare] = useState(false);
  const shareds = useRef(null);
  useToggleOutSideClick(shareds, setMyShare);
  const mySetInformation = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get(encodeURI(`member/mypage/${nickname}`));
      setInformation(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    mySetInformation();
  }, [nickname]);
  const [information, setInformation] = useState();
  const acToken = getCookies("accesstoken");
  const myFollowingMemberNickname = information?.nickname;
  const isFollowed = information?.isFollowed;

  const mypageFollow = async () => {
    await dispatch(
      __putDetailFollow({ myFollowingMemberNickname, isFollowed })
    );
    mySetInformation();
  };

  const urlShareClick = () => {
    $openModal({
      type: "alert",
      props: {
        message: "URL????????? ????????? ???????????????!",
        type: "info",
      },
    });
  };

  const NotFollow = () => {
    $openModal({
      type: "alert",
      props: {
        message: "???????????? ????????? ????????? (??????) ?????????.",
        type: "error",
      },
    });
  };

  // ????????? ?????? ??????
  // kakao SDK import
  const status = useShare("https://developers.kakao.com/sdk/js/kakao.js");
  // kakao SDK ?????????
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // ?????? initialization ??????
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJS);
      }
    }
  }, [status]);

  const kakaoShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "????????? ???????????? ???????????? ????????? ?????? ????????? ?????????",
        description: `${information.nickname}?????? ???????????? ???????????? ?????????!`,
        imageUrl:
          "https://velog.velcdn.com/images/koz8615/post/86ed8ae9-89f3-4f3e-aeb5-b390d8fd6547/image.png",
        link: {
          webUrl: currentUrl,
        },
      },
      itemContent: {
        profileText: information.nickname,
        profileImageUrl: information.profileImg,
      },
    });
  };
  console.log(information);
  return (
    <LeftTotalDiv>
      <MypageLeftDiv>
        <MypageProfile src={information?.profileImg} />
        <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
          {information?.nickname}
        </h1>
        <RowView>
          {information?.jobList.map((job, index) => {
            if (job === "") {
              return;
            } else {
              return <span key={index}>{job}</span>;
            }
          })}
        </RowView>
        {information?.isMine ? (
          <>
            <MypageBtn onClick={() => navigate("/setpage")}>
              ????????? ??????
            </MypageBtn>
          </>
        ) : (
          <>
            {acToken === undefined ? (
              <MypageBtn onClick={NotFollow}>?????????</MypageBtn>
            ) : (
              <MypageBtn
                onClick={mypageFollow}
                style={{
                  backgroundColor: isFollowed ? "#ff4d00" : "transparent",
                  color: isFollowed ? "white" : "black",
                }}
              >
                {isFollowed ? "???????????????" : "?????????"}
              </MypageBtn>
            )}
            <MypageBtn
              onClick={() => {
                dispatch(__directMessage(information?.nickname)).then(
                  (data) => {
                    console.log("directmsg", data);
                    navigate(PATH.chat);
                  }
                );
              }}
            >
              ???????????? ?????????
            </MypageBtn>
          </>
        )}
        <MypageBtn ref={shareds} onClick={() => setMyShare(!myShare)}>
          <ShareDiv>??????</ShareDiv>
          <ShareDiv>
            {myShare ? (
              <MypageShare>
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
                <button
                  onClick={kakaoShare}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Img
                    wd="2rem"
                    src={kakaoIcon}
                    style={{ cursor: "pointer" }}
                  />
                </button>
              </MypageShare>
            ) : (
              ""
            )}
          </ShareDiv>
        </MypageBtn>

        {/* <div style={{ marginTop: "1rem" }}>{information?.email}</div> */}
        <RowView style={{ marginTop: "1rem" }}>
          <button>
            <div>?????????</div>
            <div style={{ marginLeft: "10px" }}>
              {information?.followerCount}
            </div>
          </button>
          <button>
            <div>?????????</div>
            <div style={{ marginLeft: "10px" }}>
              {information?.followingCount}
            </div>
          </button>
        </RowView>
        <div style={{ color: "rgba(0,0,0,.5)" }}>My Social Link</div>
        <RowView style={{ marginTop: "1rem" }}>
          <button
            onClick={() => {
              window.location.assign(information?.facebookURL);
            }}
          >
            <Img wd="2rem" src={facebook} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.instagramURL);
            }}
          >
            <Img wd="2rem" src={insta} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.linkedinURL);
            }}
          >
            <Img wd="2rem" src={linkedIn} />
          </button>
          <button
            onClick={() => {
              window.location.assign(information?.twitterURL);
            }}
          >
            <Img wd="2rem" src={twitter} />
          </button>
        </RowView>
        <div>
          <Hr />
        </div>
        <MypageAbout>
          <div>About me</div>
          <div>{information?.aboutMe}</div>
        </MypageAbout>
      </MypageLeftDiv>
      {/* <MyLeftMoreView>
        <MoreViewDiv>
          <div>????????? ????????????</div>
          <button>????????? {">"}</button>
        </MoreViewDiv>
        <MypageLeftBottom />
        <MypageLeftBottom />
        <MypageLeftBottom />
      </MyLeftMoreView> */}
    </LeftTotalDiv>
  );
};

export default MypageLeft;

const LeftTotalDiv = styled.div`
  display: flex;
  width: 22%;
  flex-direction: column;
`;

const MypageLeftDiv = styled.div`
  margin: 0 1rem;
  padding-top: 5rem;
  width: 90%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const MypageProfile = styled.img`
  border: 1px solid black;
  width: 13rem;
  height: 13rem;
  border-radius: 70%;
  margin-bottom: 1.5rem;
`;

const MypageBtn = styled.button`
  width: 60%;
  height: 2rem;
  border-radius: 20px;
  border: 1px solid #ff4d00;
  background-color: transparent;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShareDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MypageAbout = styled.div`
  width: 60%;
  div {
    margin: 10px 0;
  }
`;

const Hr = styled.hr`
  width: 180px;
  height: 0.5px;
  border: transparent;
  background-color: rgba(0, 0, 0, 0.2);
`;

const RowView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  span {
    /* width: 50px; */
    border-radius: 20px;
    font-size: 10px;
    padding: 2px 5px;
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, 0.2);
  }
  button {
    border: transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  img {
    cursor: pointer;
  }
`;

// const MyLeftMoreView = styled.div`
//   width: 90%;
//   margin: 0 1rem;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-radius: 10px;
//   margin-top: 20px;
//   padding: 10px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;

// const MoreViewDiv = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   font-size: 13px;
//   button {
//     border: transparent;
//     background-color: transparent;
//   }
// `;

const MypageShare = styled.div`
  width: 100%;
  position: relative;
  border: 1px solid #ff4d00;
  border-radius: 5px;
  padding: 10px;
  margin-top: -43px;
  top: 50px;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: space-around;
  animation: shareBox;
  animation-duration: 0.5s;
  @keyframes shareBox {
    0% {
      transform: scaleY(0);
      transform-origin: 100% 0%;
    }
    100% {
      transform: scaleY(1);
      transform-origin: 100% 0%;
    }
  }
  button {
    border: transparent;
    display: flex;
    align-items: center;
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
