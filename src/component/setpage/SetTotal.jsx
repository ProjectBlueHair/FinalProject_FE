import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  checkfalse,
  checktrue,
  facebook,
  insta,
  linkedIn,
  soundcloud,
  twitter,
} from "../../asset/pic";
import Img from "../elem/Img";
import { Link } from "react-scroll";
import { instanceAxios } from "../../dataManager/apiConfig";
import { elementScrollIntoView } from "seamless-scroll-polyfill";

const SetTotal = () => {
  // 각각의 inpput값 관리
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [inputFace, setInputFace] = useState("https://www.facebook.com/");
  const [inputInsta, setInputInsta] = useState("https://www.instagram.com/");
  const [inputLinked, setInputLinked] = useState("https://www.linkedin.com/");
  const [inputTwitter, setInputTwitter] = useState("https://twitter.com/");
  const [inputSound, setInputSound] = useState("https://soundcloud.com/");
  const [job, setJob] = useState("");
  const [myinfo, setMyinfo] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  // 계정 설정, 알람설정 색상변경
  const [account, setAccount] = useState(true);
  const [alarm, setAlarm] = useState(false);

  // 링크쪽 상태값들
  const [facebookState, setFacebookState] = useState(false);
  const [instaState, setInstaState] = useState(false);
  const [linkedState, setLinkedState] = useState(false);
  const [twitterState, setTwitterState] = useState(false);
  const [soundcloudState, setSoundCloudState] = useState(false);

  // 알림쪽 상태값들
  const [liked, setLiked] = useState(true);
  const [comments, setComments] = useState(true);
  const [collabo, setCollabo] = useState(true);
  const [DM, setDM] = useState(true);
  const [follow, setFollow] = useState(true);

  // 닉네임 중복체크 / 패스워드 체크 / 패스워드 조건 메세지
  const [userCheck, setUserCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [pwConfirmCheck, setPwConfirmCheck] = useState(false);
  const [pwConfiromMsg, setPwConfirmMsg] = useState("");

  // 이미지 관련 로직
  const [s3inFile, setS3inFile] = useState("");
  const [preImg, setPreImg] = useState("");
  const imgRef = useRef("");

  const setPageImg = (e) => {
    const file = e.target.files[0];
    // 용량 5MB제한
    const fileSize = 5 * 1024 * 1024;
    // 이미지 미리보기 로직

    if (fileSize < file.size) {
      alert("업로드 가능한 최대 용량은 5MB입니다");
    } else {
      setS3inFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreImg(reader.result);
      };
    }
  };

  // 좌측 버튼 부분들
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

  // 페이스북 상태값
  const onFacebook = () => {
    setFacebookState(true);
  };
  const offFacebook = () => {
    setFacebookState(false);
    setInputFace("https://www.facebook.com/");
  };
  // 인스타 상태값
  const onInsta = () => {
    setInstaState(true);
  };
  const offInsta = () => {
    setInstaState(false);
    setInputInsta("https://www.instagram.com/");
  };
  // 링크드인 상태값
  const onLinked = () => {
    setLinkedState(true);
  };
  const offLinked = () => {
    setLinkedState(false);
    setInputLinked("https://www.linkedin.com/");
  };
  // 트위터 상태값
  const onTwitter = () => {
    setTwitterState(true);
  };
  const offTwitter = () => {
    setTwitterState(false);
    setInputTwitter("https://twitter.com/");
  };
  // 사운드 클라우드 상태값
  const onSoundCloud = () => {
    setSoundCloudState(true);
  };
  const offSoundCloud = () => {
    setSoundCloudState(false);
    setInputSound("https://soundcloud.com/");
  };

  // 페이스북 input 값
  const facebookChange = (e) => {
    setInputFace(e.target.value);
  };
  // 인스트 input 값
  const instaChange = (e) => {
    setInputInsta(e.target.value);
  };
  // 링크드인 input 값
  const linkedChange = (e) => {
    setInputLinked(e.target.value);
  };
  // 트위터 input 값
  const twitterChange = (e) => {
    setInputTwitter(e.target.value);
  };
  // 사운드클라우드 input 값
  const soundcloudChange = (e) => {
    setInputSound(e.target.value);
  };
  // 유저 네임 input 값
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  // 직업 input 값
  const jobChange = (e) => {
    setJob(e.target.value);
  };
  // 직업이 여러개 일시 /로 구분해서 배열로 만듬 ex) 피아니스트/작곡가 => ["피아니스트","작곡가"] 이렇게 값을 보냄
  // 띄워쓰기 처리 완료
  const jobSplit = job.replace(/ /g, "").split("/");
  console.log(jobSplit);
  // 내정보 input 값
  const MyInformation = (e) => {
    setMyinfo(e.target.value);
  };

  // 좋아요 알람
  const likedClick = () => {
    setLiked(!liked);
  };
  // 댓글 알람
  const commentsClick = () => {
    setComments(!comments);
  };
  // 콜라보 알람
  const collaboClick = () => {
    setCollabo(!collabo);
  };
  // DM 알람
  const DMClick = () => {
    setDM(!DM);
  };
  // follow 알람
  const followClick = () => {
    setFollow(!follow);
  };
  // 유저네임 중복체크
  const usernameCheck = useCallback(() => {
    if (username?.length === 0) {
      alert("닉네임을 입력해주세요");
      return;
    } else if (username?.length < 2 || username?.length > 15) {
      alert("2자이상, 15자 이내로 작성해 주세요");
    } else {
      usernameChecking({
        username,
      }).then((res) => {
        if (res === undefined) {
          setUserCheck(false);
        } else {
          setUserCheck(true);
        }
      });
    }
  }, [username]);

  const usernameChecking = async (post) => {
    try {
      const { data } = await instanceAxios.post("member/validate/nickname", {
        nickname: post.username,
      });
      if (data.customHttpStatus === 2000) {
        alert(data.message + "입니다");
        return data;
      } else {
        alert(data.message);
      }
    } catch (error) {
      return console.log(error);
    }
  };
  // 패스워드 체크
  const passwordChecking = useCallback(
    (e) => {
      const newPassword = e.target.value;
      setpassword(newPassword);
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
  const passwordConfirm = useCallback(
    (e) => {
      const PWConfirmValue = e.target.value;
      setPwConfirm(PWConfirmValue);
      if (
        password === PWConfirmValue &&
        password.length === PWConfirmValue.length
      ) {
        setPwConfirmCheck(true);
        setPwConfirmMsg("");
      } else {
        setPwConfirmCheck(false);
        setPwConfirmMsg("비밀번호가 일치하지 않습니다");
      }
    },
    [password]
  );
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
              <div>
                이메일 중복체크해서 바꿀수는 있겠지만 다른사이트 보면 한번
                설정한 이메일은 변경을 못하지 않을까?
              </div>
            </TextDiv>
            <TextDiv>
              <div>UserName</div>
              <div>
                {userCheck ? (
                  <input
                    value={username}
                    readOnly={username}
                    style={{
                      backgroundColor: "#ff4d00",
                      color: "white",
                      border: "transparent",
                    }}
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      style={{ width: "63%" }}
                      onChange={usernameChange}
                      value={username}
                    />
                    <button onClick={usernameCheck}>중복 체크</button>
                  </>
                )}
              </div>
            </TextDiv>
            <TextDiv>
              <div>New Password</div>

              {passwordCheck ? (
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
              )}
            </TextDiv>
            <TextDiv>
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
                  ( 직업이 여러개 일 시 "/" 를 이용하여 구분하여주세요!!
                  ex.지휘자/작곡가 )
                </span>
              </div>
              <input type="text" onChange={jobChange} />
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
                {facebookState ? (
                  <>
                    <input
                      type="text"
                      value={inputFace}
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
                {instaState ? (
                  <>
                    <input
                      type="text"
                      value={inputInsta}
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
                {linkedState ? (
                  <>
                    <input
                      type="text"
                      value={inputLinked}
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
                {twitterState ? (
                  <>
                    <input
                      type="text"
                      value={inputTwitter}
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
              <div>
                <Img wd="2rem" src={soundcloud} />
                {soundcloudState ? (
                  <>
                    <input
                      type="text"
                      value={inputSound}
                      onChange={soundcloudChange}
                    />
                    <OffBtn onClick={offSoundCloud}>링크 해제</OffBtn>
                  </>
                ) : (
                  <LinkButton onClick={onSoundCloud}>
                    링크 클릭해 주세요~
                  </LinkButton>
                )}
              </div>
            </Social>
            <div style={{ marginBottom: "5px" }}>내정보</div>
            <MyInformationInput type="text" onChange={MyInformation} />
          </div>
        </SetRowDiv>
        <HrLine id="MoveAlarm">알림 설정</HrLine>
        <AlarmDiv>
          <AlarmCheck>
            {liked ? (
              <Img wd="2rem" src={checktrue} onClick={likedClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={likedClick} />
            )}
            <div>좋아요</div>
          </AlarmCheck>
          <AlarmCheck>
            {comments ? (
              <Img wd="2rem" src={checktrue} onClick={commentsClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={commentsClick} />
            )}
            <div>댓글</div>
          </AlarmCheck>
          <AlarmCheck>
            {collabo ? (
              <Img wd="2rem" src={checktrue} onClick={collaboClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={collaboClick} />
            )}
            <div>콜라보 요청</div>
          </AlarmCheck>
          <AlarmCheck>
            {DM ? (
              <Img wd="2rem" src={checktrue} onClick={DMClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={DMClick} />
            )}
            <div>DM</div>
          </AlarmCheck>
          <AlarmCheck>
            {follow ? (
              <Img wd="2rem" src={checktrue} onClick={followClick} />
            ) : (
              <Img wd="2rem" src={checkfalse} onClick={followClick} />
            )}
            <div>팔로우</div>
          </AlarmCheck>
        </AlarmDiv>
        <SetBottom>
          <button>홈으로</button>
          <button>저장</button>
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
  width: 20%;
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
  width: 63%;
  border-radius: 20px;
  margin-left: 15px;
  border: transparent;
`;

const SetRightDiv = styled.div`
  width: 80%;
  overflow: auto;
`;

const TextDiv = styled.div`
  margin-bottom: 20px;
  input {
    width: 80%;
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
    width: 50%;
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
