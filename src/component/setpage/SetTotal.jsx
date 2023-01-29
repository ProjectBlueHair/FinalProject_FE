import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  checkfalse,
  checktrue,
  facebook,
  insta,
  linkedIn,
  twitter,
} from "../../asset/pic";
import Img from "../elem/Img";
import { instanceAxios } from "../../dataManager/apiConfig";
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import { uploadFiles } from "../../dataManager/imageS3";
import { useDispatch } from "react-redux";
import { __getUserInfo } from "../../redux/slice/detailSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTypeModal from "../../modal/hooks/useTypeModal";

const SetTotal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { $openModal, $closeModal } = useTypeModal();
  const setList = async () => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get("member/setting");
      // input 값들
      setAboutMe(data.aboutMe);
      // 알림부분
      setLikeNotify(data.likeNotify);
      setCommentNotify(data.commentNotify);
      setDmNotify(data.dmNotify);
      setFollowNotify(data.followNotify);
      // 링크 부분 true/false
      setFacebookActivated(data.facebookActivated);
      setInstagramActivated(data.instagramActivated);
      setLinkedinActivated(data.linkedinActivated);
      setTwitterActivated(data.twitterActivated);
      // 링크 부분 URL
      setFacebookURL(data.facebookURL);
      setInstagramURL(data.instagramURL);
      setLinkedinURL(data.linkedinURL);
      setTwitterURL(data.twitterURL);
      // 이미지 미리보기
      setPreImg(data.profileImg);
      setJobList(data.jobList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setList();
    dispatch(__getUserInfo());
  }, []);

  const userEmail = useSelector((state) => state.user.user?.email);

  // 계정 설정, 알람설정 색상변경 (통신 X)
  const [account, setAccount] = useState(true);
  const [alarm, setAlarm] = useState(false);

  // 링크쪽 상태값들
  const [facebookActivated, setFacebookActivated] = useState(null);
  const [instagramActivated, setInstagramActivated] = useState(null);
  const [linkedinActivated, setLinkedinActivated] = useState(null);
  const [twitterActivated, setTwitterActivated] = useState(null);

  // 링크 URL
  const [facebookURL, setFacebookURL] = useState(null);
  const [instagramURL, setInstagramURL] = useState(null);
  const [linkedinURL, setLinkedinURL] = useState(null);
  const [twitterURL, setTwitterURL] = useState(null);

  // 알림쪽 상태값들
  const [likeNotify, setLikeNotify] = useState(null);
  const [commentNotify, setCommentNotify] = useState(null);
  const [dmNotify, setDmNotify] = useState(null);
  const [followNotify, setFollowNotify] = useState(null);

  // 이미지 관련 로직
  const [proImg, setProImg] = useState(null);
  const [preImg, setPreImg] = useState(null);
  const imgRef = useRef("");

  // input 값 관리
  const [aboutMe, setAboutMe] = useState("");
  const [jobList, setJobList] = useState("");

  // 각각의 inpput값 관리
  const [nickname, setNickname] = useState(null);
  const [password, setpassword] = useState(null);
  const [pwConfirm, setPwConfirm] = useState("");

  // 닉네임 중복체크 / 패스워드 체크 / 패스워드 조건 메세지
  const [userCheck, setUserCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  // const [pwConfirmCheck, setPwConfirmCheck] = useState(false);
  // const [pwConfiromMsg, setPwConfirmMsg] = useState("");

  // const 아이디 비밀번호 클릭시 인풋창 보이게만들기
  const [nameView, setNameView] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

  const setPageImg = (e) => {
    const file = e.target.files[0];
    // 용량 5MB제한
    const fileSize = 5 * 1024 * 1024;
    // 이미지 미리보기 로직

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
        setPreImg(reader.result);
      };
    }
  };

  // 좌측 버튼 부분들
  // 계정 설정이동
  const onAccount = () => {
    let acc = document.querySelector("#MoveAccount");
    elementScrollIntoView(acc, { behavior: "smooth" });
    setAlarm(false);
    setAccount(true);
  };
  // 알람 설정 이동
  const onAlarm = () => {
    let acc = document.querySelector("#MoveAlarm");
    elementScrollIntoView(acc, { behavior: "smooth" });
    setAlarm(true);
    setAccount(false);
  };

  // 페이스북 상태값
  const onFacebook = () => {
    setFacebookActivated(true);
  };
  const offFacebook = () => {
    setFacebookActivated(false);
    setFacebookURL("https://www.facebook.com/");
  };
  // 인스타 상태값
  const onInsta = () => {
    setInstagramActivated(true);
  };
  const offInsta = () => {
    setInstagramActivated(false);
    setInstagramURL("https://www.instagram.com/");
  };
  // 링크드인 상태값
  const onLinked = () => {
    setLinkedinActivated(true);
  };
  const offLinked = () => {
    setLinkedinActivated(false);
    setLinkedinURL("https://www.linkedin.com/");
  };
  // 트위터 상태값
  const onTwitter = () => {
    setTwitterActivated(true);
  };
  const offTwitter = () => {
    setTwitterActivated(false);
    setTwitterURL("https://twitter.com/");
  };

  // 페이스북 input 값
  const facebookChange = (e) => {
    setFacebookURL(e.target.value);
  };
  // 인스트 input 값
  const instaChange = (e) => {
    setInstagramURL(e.target.value);
  };
  // 링크드인 input 값
  const linkedChange = (e) => {
    setLinkedinURL(e.target.value);
  };
  // 트위터 input 값
  const twitterChange = (e) => {
    setTwitterURL(e.target.value);
  };
  // 유저 네임 input 값
  const usernameChange = (e) => {
    const name = e.target.value;
    if (name === "" || name === undefined) {
      setNickname(null);
    } else {
      setNickname(name);
    }
  };
  // 직업 input 값
  const jobChange = (e) => {
    const job = e.target.value;
    setJobList(job.replace(/ /g, "").split(","));
  };

  // 내정보 input 값
  const MyInformation = (e) => {
    setAboutMe(e.target.value);
  };

  // 좋아요 알람
  const likedClick = () => {
    setLikeNotify(!likeNotify);
  };
  // 댓글 알람
  const commentsClick = () => {
    setCommentNotify(!commentNotify);
  };
  // DM 알람
  const DMClick = () => {
    setDmNotify(!dmNotify);
  };
  // follow 알람
  const followClick = () => {
    setFollowNotify(!followNotify);
  };
  // 유저네임 중복체크
  const usernameCheck = useCallback(() => {
    if (nickname?.length === 0 || nickname === null) {
      $openModal({
        type: "alert",
        props: {
          message: "닉네임을 입력해주세요",
          type: "info",
        },
      });
      return;
    } else if (nickname?.length < 2 || nickname?.length > 15) {
      $openModal({
        type: "alert",
        props: {
          message: "2자이상, 15자 이내로 작성해 주세요",
          type: "info",
        },
      });
    } else {
      usernameChecking({
        nickname,
      }).then((res) => {
        if (res === undefined) {
          setUserCheck(false);
        } else {
          setUserCheck(true);
        }
      });
    }
  }, [nickname]);

  const usernameChecking = async (post) => {
    try {
      const { data } = await instanceAxios.post(
        "member/validate/nickname",
        post
      );
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
        setpassword(null);
      } else {
        setpassword(newPassword);
      }

      const PWREX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/;
      if (!PWREX.test(newPassword)) {
        setPasswordCheck(false);
        setPasswordMsg(
          "대,소문자 + 숫자 + 특수기호 각각 1개 이상, 8글자 이상 15이하 필요합니다"
        );
      } else {
        setPasswordCheck(true);
        setPasswordMsg("");
      }
    },
    [password]
  );
  // 패스워드 체크
  // const passwordConfirm = useCallback(
  //   (e) => {
  //     const PWConfirmValue = e.target.value;
  //     setPwConfirm(PWConfirmValue);
  //     if (
  //       password === PWConfirmValue &&
  //       password.length === PWConfirmValue.length
  //     ) {
  //       setPwConfirmCheck(true);
  //       setPwConfirmMsg("");
  //     } else {
  //       setPwConfirmCheck(false);
  //       setPwConfirmMsg("비밀번호가 일치하지 않습니다");
  //     }
  //   },
  //   [password]
  // );

  // 저장 버튼 클릭시 정상적으로 이미지 이동 처리 완료
  const onSave = () => {
    if (proImg === null) {
      const profileImg = preImg;
      putSave({
        profileImg,
        facebookActivated,
        instagramActivated,
        linkedinActivated,
        twitterActivated,
        facebookURL,
        instagramURL,
        linkedinURL,
        twitterURL,
        likeNotify,
        commentNotify,
        dmNotify,
        followNotify,
        aboutMe,
        jobList,
        nickname,
        password,
      }).then((res) => {
        if (res === undefined) {
          return;
        } else {
          $openModal({
            type: "alert",
            props: {
              message: res.message,
              type: "info",
            },
          });
          navigate("/");
        }
      });
    } else {
      uploadFiles(proImg).then((res) => {
        const profileImg = res.Location;
        putSave({
          profileImg,
          facebookActivated,
          instagramActivated,
          linkedinActivated,
          twitterActivated,
          facebookURL,
          instagramURL,
          linkedinURL,
          twitterURL,
          likeNotify,
          commentNotify,
          dmNotify,
          followNotify,
          aboutMe,
          jobList,
          nickname,
          password,
        }).then((res) => {
          if (res === undefined) {
            return;
          } else {
            $openModal({
              type: "alert",
              props: {
                message: res.message,
                type: "info",
              },
            });
            navigate("/");
          }
        });
      });
    }
  };
  // put 통신
  const putSave = async (put) => {
    try {
      const { data } = await instanceAxios.put("member/setting", put);
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
    } catch (error) {
      console.log(error);
    }
  };

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
            <img src={preImg} onClick={() => imgRef.current.click()} />
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
                    onChange={usernameChange}
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
              {/* {} */}
            </TextDiv>
            {/*<TextDiv>
               <div>New Password Confirm</div>
              {pwConfirmCheck ? (
                <>
                  <input
                    type="password"
                    onChange={passwordConfirm}
                    style={{
                      backgroundColor: "#ff4d00",
                      color: "white",
                      border: "transparent",
                    }}
                  />
                  <p>{pwConfiromMsg}</p>
                </>
              ) : (
                <>
                  <input type="password" onChange={passwordConfirm} />
                  <p
                    style={{
                      color: "#ff4d00",
                      fontSize: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    {pwConfiromMsg}
                  </p>
                </>
              )}
            </TextDiv> */}
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
                  ( 직업이 여러개 일 시 "," 를 이용하여 구분하여주세요!! ex.래퍼
                  , 작사가 )
                </span>
              </div>
              <input type="text" value={jobList} onChange={jobChange} />
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
                {facebookActivated ? (
                  <>
                    <input
                      type="text"
                      value={facebookURL}
                      onChange={facebookChange}
                    />
                    <OffBtn onClick={offFacebook}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton onClick={onFacebook}>
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={insta} />
                {instagramActivated ? (
                  <>
                    <input
                      type="text"
                      value={instagramURL}
                      onChange={instaChange}
                    />
                    <OffBtn onClick={offInsta}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton onClick={onInsta}>링크 클릭해 주세요~</LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={linkedIn} />
                {linkedinActivated ? (
                  <>
                    <input
                      type="text"
                      value={linkedinURL}
                      onChange={linkedChange}
                    />
                    <OffBtn onClick={offLinked}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton onClick={onLinked}>
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
              <div>
                <Img wd="2rem" src={twitter} />
                {twitterActivated ? (
                  <>
                    <input
                      type="text"
                      value={twitterURL}
                      onChange={twitterChange}
                    />
                    <OffBtn onClick={offTwitter}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton onClick={onTwitter}>
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
            </Social>
            <div style={{ marginBottom: "5px" }}>내정보</div>
            <MyInformationInput
              type="text"
              value={aboutMe}
              onChange={MyInformation}
            />
          </div>
        </SetRowDiv>
        <HrLine id="MoveAlarm">알림 설정</HrLine>
        <AlarmDiv>
          <AlarmCheck>
            {likeNotify ? (
              <Img wd="2rem" src={checktrue} onClick={likedClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={likedClick} />
            )}
            <div>좋아요</div>
          </AlarmCheck>
          <AlarmCheck>
            {commentNotify ? (
              <Img wd="2rem" src={checktrue} onClick={commentsClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={commentsClick} />
            )}
            <div>댓글</div>
          </AlarmCheck>
          <AlarmCheck>
            {dmNotify ? (
              <Img wd="2rem" src={checktrue} onClick={DMClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={DMClick} />
            )}
            <div>DM</div>
          </AlarmCheck>
          <AlarmCheck>
            {followNotify ? (
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
  background-color: #ff4d00;
  border: transparent;
  color: white;
  font-size: 10px;
`;

const LinkButton = styled.button`
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
  width: 80%;
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
    width: 70px;
    height: 3rem;
    border-radius: 20px;
    border: transparent;
    background-color: #ff4d00;
    color: white;
  }
`;
