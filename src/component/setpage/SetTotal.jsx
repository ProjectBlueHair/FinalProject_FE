import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import styled from "styled-components";
import {
  checkfalse,
  checktrue,
  facebook,
  insta,
  linkedIn,
  twitter,
} from "../../asset/pic";
import { apiClient } from "../../dataManager/interceptors";
import { removeCookies, setCookie } from "../../dataManager/cookie";
import { uploadFiles } from "../../dataManager/imageS3";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { __getUserInfo } from "../../redux/slice/detailSlice";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import { onIssued, reissuance } from "../../util/Reissuance";
import Img from "../elem/Img";

const SetTotal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { $openModal, $closeModal } = useTypeModal();
  const setList = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get("member/setting");
      updateEvent({ aboutMe: data.aboutMe });
      updateEvent({ likeNotify: data.likeNotify });
      updateEvent({ commentNotify: data.commentNotify });
      updateEvent({ dmNotify: data.dmNotify });
      updateEvent({ followNotify: data.followNotify });
      updateEvent({ facebookActivated: data.facebookActivated });
      updateEvent({ instagramActivated: data.instagramActivated });
      updateEvent({ linkedinActivated: data.linkedinActivated });
      updateEvent({ twitterActivated: data.twitterActivated });
      updateEvent({ facebookURL: data.facebookURL });
      updateEvent({ instagramURL: data.instagramURL });
      updateEvent({ linkedinURL: data.linkedinURL });
      updateEvent({ twitterURL: data.twitterURL });
      // 이미지 미리보기
      updateEvent({ preImg: data.profileImg });
      // setPreImg(data.profileImg);
      updateEvent({ jobList: data.jobList });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setList();
    dispatch(__getUserInfo());
  }, []);

  const userEmail = useSelector((state) => state.user.user?.email);

  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      facebookActivated: null,
      instagramActivated: null,
      linkedinActivated: null,
      twitterActivated: null,
      facebookURL: null,
      instagramURL: null,
      linkedinURL: null,
      twitterURL: null,
      aboutMe: "",
      likeNotify: null,
      commentNotify: null,
      dmNotify: null,
      followNotify: null,
      jobList: [],
      preImg: "",
      nickname: null,
      password: null,
    }
  );

  const [account, setAccount] = useState(true);
  const [alarm, setAlarm] = useState(false);

  const [proImg, setProImg] = useState(null);
  const imgRef = useRef("");

  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  const [nameView, setNameView] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

  const setPageImg = (e) => {
    const file = e.target.files[0];
    const fileSize = 5 * 1024 * 1024;

    if (fileSize < file.size) {
      $openModal({
        type: "alert",
        props: {
          message: "업로드 가능한 최대 용량은 5MB입니다",
          type: "info",
        },
      });
    } else {
      setProImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        updateEvent({ proImg: reader.result });
      };
    }
  };

  const onAccount = () => {
    let acc = document.querySelector("#MoveAccount");
    elementScrollIntoView(acc, { behavior: "smooth" });
    setAlarm(false);
    setAccount(true);
  };
  const onAlarm = () => {
    let acc = document.querySelector("#MoveAlarm");
    elementScrollIntoView(acc, { behavior: "smooth" });
    setAlarm(true);
    setAccount(false);
  };

  const offFacebook = () => {
    updateEvent({ facebookActivated: false });
    updateEvent({ facebookURL: "https://www.facebook.com/" });
  };
  const offInsta = () => {
    updateEvent({ instagramActivated: false });
    updateEvent({ instagramURL: "https://www.instagram.com/" });
  };
  const offLinked = () => {
    updateEvent({ linkedinActivated: false });
    updateEvent({ linkedinURL: "https://www.linkedin.com/" });
  };
  const offTwitter = () => {
    updateEvent({ twitterActivated: false });
    updateEvent({ twitterURL: "https://twitter.com/" });
  };

  const usernameChange = (e) => {
    const name = e.target.value;
    if (name === "" || name === undefined) {
      updateEvent({ nickname: null });
    } else {
      updateEvent({ nickname: name });
    }
  };
  const jobChange = (e) => {
    const job = e.target.value.replace(/ /g, "").split(",");
    updateEvent({ jobList: job });
  };
  const likedClick = () => {
    updateEvent({ likeNotify: !event.likeNotify });
  };
  const commentsClick = () => {
    updateEvent({ commentNotify: !event.commentNotify });
  };
  const DMClick = () => {
    updateEvent({ dmNotify: !event.dmNotify });
  };
  const followClick = () => {
    updateEvent({ followNotify: !event.followNotify });
  };
  const usernameCheck = () => {
    if (event.nickname?.length === 0 || event.nickname === null) {
      $openModal({
        type: "alert",
        props: {
          message: "닉네임을 입력해주세요",
          type: "info",
        },
      });
      return;
    } else if (event.nickname.length < 2 || event.nickname.length > 15) {
      $openModal({
        type: "alert",
        props: {
          message: "닉네임 2글자이상, 15글자 이내로 작성해 주세요",
          type: "info",
        },
      });
    } else {
      usernameChecking(event.nickname);
    }
  };

  const usernameChecking = async (post) => {
    try {
      const { data } = await apiClient.post("member/validate/nickname", {
        nickname: post,
      });
      if (data.customHttpStatus === 2000) {
        $openModal({
          type: "alert",
          props: {
            message: data.message + "입니다",
            type: "info",
          },
        });
        return data;
      } else {
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };
  // 패스워드 체크
  const passwordChecking = useCallback(
    (e) => {
      const newPassword = e.target.value;
      if (newPassword === "" || newPassword === undefined) {
        updateEvent({ password: null });
      } else {
        updateEvent({ password: newPassword });
      }

      const PWREX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/;
      if (!PWREX.test(newPassword)) {
        setPasswordCheck(false);
        setPasswordMsg(
          "대,소문자 + 숫자 + 특수기호 각각 1개 이상, 8글자 이상 15글자 이하로 입력해 주세요"
        );
      } else {
        setPasswordCheck(true);
        setPasswordMsg("");
      }
    },
    [event.password]
  );

  const onSave = () => {
    if (proImg === null) {
      const profileImg = event.preImg;
      updateEvent({ profileImg: profileImg });
      putSave(event).then((res) => {
        res &&
          reissuance()
            .then((data) => {
              onIssued(data)
              $openModal({
                type: "alert",
                props: {
                  message: res.message,
                  type: "info",
                  to: `/mypage/${res.data}`,
                },
              });
              dispatch(__getGeneralUserInfo());
            })
            .catch((e) => {
              throw new Error("재발행 실패");
            });
      });
    } else {
      uploadFiles(proImg).then((res) => {
        const profileImg = res.Location;
        updateEvent({ profileImg: profileImg });
        putSave(event).then((res) => {
          res &&
            reissuance()
              .then((data) => {
                onIssued(data)
                $openModal({
                  type: "alert",
                  props: {
                    message: res.message,
                    type: "info",
                    to: `/mypage/${res.data}`,
                  },
                });
                dispatch(__getGeneralUserInfo());
              })
              .catch((e) => {
                throw new Error("재발행 실패");
              });
        });
      });
    }
  };
  // put 통신
  const putSave = async (put) => {
    console.log("33", put);
    try {
      if (put?.nickname?.length < 2 || put?.nickname?.length > 15) {
        $openModal({
          type: "alert",
          props: {
            message: "닉네임 2글자이상, 15글자 이내로 작성해 주세요",
            type: "info",
          },
        });
      } else {
        const { data } = await apiClient.put("member/setting", put);
        if (data.customHttpStatus === 2000) {
          return data;
        } else {
          $openModal({
            type: "alert",
            props: {
              message: data.message,
              type: "info",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(event);
  return (
    <SetTotalDiv>
      <SetLeftDiv>
        <h1>설정</h1>
        {account ? (
          <button
            onClick={onAccount}
            style={{ backgroundColor: "rgba(255, 77, 0, 0.1)" }}
          >
            계정 설정
          </button>
        ) : (
          <button onClick={onAccount}>계정 설정</button>
        )}
        {alarm ? (
          <button
            onClick={onAlarm}
            style={{ backgroundColor: "rgba(255, 77, 0, 0.1)" }}
          >
            알림 설정
          </button>
        ) : (
          <button onClick={onAlarm}>알림 설정</button>
        )}
      </SetLeftDiv>
      <SetRightDiv>
        <HrLine id="MoveAccount">계정 설정</HrLine>
        <SetRowDiv>
          <SetProfile>
            <TextDiv>프로필</TextDiv>
            <input
              type="file"
              id="upload"
              ref={imgRef}
              onChange={setPageImg}
              accept="image/*"
            />
            <label htmlFor="upload"></label>
            <img
              src={event.preImg}
              onClick={() => imgRef.current.click()}
              style={{ cursor: "pointer" }}
            />
          </SetProfile>
          <div>
            <TextDiv>
              <div>Email</div>
              <div style={{ marginTop: "5px" }}>{userEmail}</div>
            </TextDiv>
            <TextDiv>
              <div>UserName</div>
              {nameView ? (
                <div>
                  <input
                    type="text"
                    style={{ width: "82%" }}
                    value={event.nickname}
                    onChange={usernameChange}
                    minLength={2}
                    maxLength={15}
                  />
                  <button onClick={usernameCheck}>중복 체크</button>
                </div>
              ) : (
                <button
                  style={{
                    width: "100%",
                    marginLeft: "-1px",
                    marginTop: "5px",
                  }}
                  onClick={() => setNameView(true)}
                >
                  변경할 때 만 클릭 후 이용해 주세요!
                </button>
              )}
            </TextDiv>
            <TextDiv>
              <div>New Password</div>
              {passwordView ? (
                passwordCheck ? (
                  <>
                    <input
                      type="password"
                      onChange={passwordChecking}
                      maxLength={15}
                      minLength={8}
                      style={{
                        backgroundColor: "#ff4d00",
                        color: "white",
                        border: "transparent",
                      }}
                    />
                    <p>{passwordMsg}</p>
                  </>
                ) : (
                  <>
                    <input type="password" onChange={passwordChecking} />
                    <p
                      style={{
                        color: "#ff4d00",
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {passwordMsg}
                    </p>
                  </>
                )
              ) : (
                <button
                  onClick={() => setPasswordView(true)}
                  style={{
                    width: "100%",
                    marginLeft: "-1px",
                    marginTop: "5px",
                  }}
                >
                  변경할 때 만 클릭 후 이용해 주세요!
                </button>
              )}
            </TextDiv>
            <TextDiv>
              <div>
                직업
                <span
                  style={{
                    color: "#ff4d00",
                    marginLeft: "10px",
                    fontSize: "13px",
                  }}
                >
                  ( 직업이 여러개 일 시 "," 를 이용하여 구분해 주세요!! ex.래퍼
                  , 작사가 )
                </span>
              </div>
              <input type="text" value={event.jobList} onChange={jobChange} />
            </TextDiv>
            <div style={{ marginBottom: "10px" }}>
              링크
              <span
                style={{
                  marginLeft: "10px",
                  color: "#ff4d00",
                }}
              >
                ( 링크 해제시 각 사이트 기본링크만 들어갑니다! )
              </span>
            </div>
            <Social>
              <div>
                <Img wd="2rem" src={facebook} />
                {event.facebookActivated ? (
                  <>
                    <input
                      type="text"
                      value={event.facebookURL}
                      onChange={(e) =>
                        updateEvent({ facebookURL: e.target.value })
                      }
                    />
                    <OffBtn onClick={offFacebook}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton
                    onClick={() => updateEvent({ facebookActivated: true })}
                  >
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={insta} />
                {event.instagramActivated ? (
                  <>
                    <input
                      type="text"
                      value={event.instagramURL}
                      onChange={(e) =>
                        updateEvent({ instagramURL: e.target.value })
                      }
                    />
                    <OffBtn onClick={offInsta}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton
                    onClick={() => updateEvent({ instagramActivated: true })}
                  >
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={linkedIn} />
                {event.linkedinActivated ? (
                  <>
                    <input
                      type="text"
                      value={event.linkedinURL}
                      onChange={(e) =>
                        updateEvent({ linkedinURL: e.target.value })
                      }
                    />
                    <OffBtn onClick={offLinked}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton
                    onClick={() => updateEvent({ linkedinActivated: true })}
                  >
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={twitter} />
                {event.twitterActivated ? (
                  <>
                    <input
                      type="text"
                      value={event.twitterURL}
                      onChange={(e) =>
                        updateEvent({ twitterURL: e.target.value })
                      }
                    />
                    <OffBtn onClick={offTwitter}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton
                    onClick={() => updateEvent({ twitterActivated: true })}
                  >
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
            </Social>
            <div style={{ marginBottom: "5px" }}>내정보</div>
            <MyInformationInput
              type="text"
              value={event.aboutMe}
              // onChange={MyInformation}
              onChange={(e) => updateEvent({ aboutMe: e.target.value })}
            />
          </div>
        </SetRowDiv>
        <HrLine id="MoveAlarm">알림 설정</HrLine>
        <AlarmDiv>
          <AlarmCheck>
            {event.likeNotify ? (
              <Img wd="2rem" src={checktrue} onClick={likedClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={likedClick} />
            )}
            <div>좋아요</div>
          </AlarmCheck>
          <AlarmCheck>
            {event.commentNotify ? (
              <Img wd="2rem" src={checktrue} onClick={commentsClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={commentsClick} />
            )}
            <div>댓글</div>
          </AlarmCheck>
          <AlarmCheck>
            {event.dmNotify ? (
              <Img wd="2rem" src={checktrue} onClick={DMClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={DMClick} />
            )}
            <div>DM</div>
          </AlarmCheck>
          <AlarmCheck>
            {event.followNotify ? (
              <Img wd="2rem" src={checktrue} onClick={followClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={followClick} />
            )}
            <div>팔로우</div>
          </AlarmCheck>
        </AlarmDiv>
        <SetBottom>
          <button onClick={() => navigate("/")}>홈으로</button>
          <button onClick={onSave}>저장</button>
        </SetBottom>
      </SetRightDiv>
    </SetTotalDiv>
  );
};

export default SetTotal;

const SetTotalDiv = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 20px;
  overflow: auto;
`;

const HrLine = styled.div`
  display: flex;
  width: 80%;
  flex-basis: 70%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;
  margin-bottom: 20px;
  ::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.15);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const SetLeftDiv = styled.div`
  margin: 0 1rem 0 3rem;
  width: 25%;
  display: flex;
  flex-direction: column;
  button {
    display: flex;
    align-items: center;
    height: 4rem;
    border-radius: 10px;
    padding-left: 20px;
    margin-top: 10px;
    width: 80%;
    border: transparent;
  }
`;

const OffBtn = styled.button`
  width: 10%;
  height: 30px;
  border-radius: 20px;
  padding: 0 10px;
  cursor: pointer;
  background-color: #ff4d00;
  border: transparent;
  color: white;
  font-size: 10px;
`;

const LinkButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 92%;
  border-radius: 20px;
  margin-left: 15px;
  border: transparent;
  :hover {
    background-color: #ff4d00;
    color: white;
  }
`;

const SetRightDiv = styled.div`
  width: 80%;
  overflow: auto;
`;

const TextDiv = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    margin-top: 5px;
  }
  button {
    width: 15%;
    height: 30px;
    border-radius: 20px;
    border: transparent;
    cursor: pointer;
    margin-left: 10px;
    :hover {
      background-color: #ff4d00;
      color: white;
    }
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  input {
    padding-left: 10px;
    margin: 0 15px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 78%;
    height: 30px;
  }
`;

const SetRowDiv = styled.div`
  display: flex;
`;

const SetProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-right: 30px;
  input {
    display: none;
  }
  label {
    position: absolute;
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  img {
    width: 20rem;
    height: 20rem;
    border-radius: 70%;
    border: 1px solid black;
  }
`;

const MyInformationInput = styled.textarea`
  width: 100%;
  height: 10rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: none;
  padding: 5px;
`;

const AlarmDiv = styled.div`
  width: 60%;
  margin-left: 15px;
`;

const AlarmCheck = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    cursor: pointer;
  }
  div {
    margin-left: 10px;
  }
`;

const SetBottom = styled.div`
  margin: 50px 0 30px;
  width: 80%;
  display: flex;
  justify-content: end;
  gap: 10px;
  button {
    cursor: pointer;
    width: 70px;
    height: 3rem;
    border-radius: 20px;
    border: transparent;
    background-color: #ff4d00;
    color: white;
  }
`;
