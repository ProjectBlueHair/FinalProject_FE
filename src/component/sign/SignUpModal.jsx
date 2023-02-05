import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import styled from "styled-components";
import useModal from "../modal/useModal";
import { instanceAxios } from "../../dataManager/apiConfig";
import Img from "../elem/Img";
import { log } from "../../asset/pic";
import { uploadFiles } from "../../dataManager/imageS3";
import useTypeModal from "../../modal/hooks/useTypeModal";

const SignUpModal = ({ onClose }) => {
  const { closeModal } = useModal();
  const { $openModal, $closeModal } = useTypeModal();
  const imgRef = useRef("");
  // 상태값
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [prevNickname, setPrevNickname] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  // 이미지 전송전 파일
  const [s3image, setS3image] = useState(null);

  // 이미지 미리보기
  const [previewImg, setPreviewImg] = useState("");

  // 모두 true 되야 회원가입이 되게함
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [onCheckNickname, setOnCheckNickname] = useState(false);
  const [onCheckEmail, setOnCheckEmail] = useState(false);
  // 비밀번호 5가지 상태값
  const [isPwLength, setIsPwLength] = useState(false);
  const [isPwSymbol, setIsPwSymbol] = useState(false);
  const [isPwStr, setIsPwStr] = useState(false);
  const [isPwNum, setIsPwNum] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 비밀번호 확인 텍스트
  const [pwMsg, setPwMsg] = useState("");

  const SignUpImg = (e) => {
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
      setS3image(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
    }
  };

  // 이메일 정규식
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  // 닉네임
  const onChangeNickname = useCallback((e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);
    if (nicknameValue.length < 2 || nicknameValue.length > 15) {
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  }, []);

  // console.log(email);
  console.log(isEmail);
  console.log(onCheckEmail);
  // console.log(prevEmail);
  useEffect(() => {
    if (nickname !== prevNickname) {
      setOnCheckNickname(false);
    } else {
      setOnCheckNickname(true);
    }
    if (email !== prevEmail) {
      setOnCheckEmail(false);
    } else {
      setOnCheckEmail(true);
    }
  }, [nickname, email]);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!emailRegex.test(emailValue)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback(
    (e) => {
      const passwordValue = e.target.value;
      setPassword(passwordValue);
      // 정규식 : 비밀번호 길이
      const passwordLengthRegex = /^.{8,15}$/;
      // 정규식 : 특수기호
      const passwordSymbolRegex = /.*[!@#$%^&*]/;
      // 정규식 : 숫자
      const passwordNumRegex = /.*[0-9]/;
      // 정규식 : 문자
      const passwordStrRegex = /.*[a-zA-Z]/;

      // 8자리에서 15자리 정규식
      if (!passwordLengthRegex.test(passwordValue)) {
        setIsPwLength(false);
      } else {
        setIsPwLength(true);
      }
      // 특수기호
      if (!passwordSymbolRegex.test(passwordValue)) {
        setIsPwSymbol(false);
      } else {
        setIsPwSymbol(true);
      }
      // 숫자
      if (!passwordNumRegex.test(passwordValue)) {
        setIsPwNum(false);
      } else {
        setIsPwNum(true);
      }
      // 문자
      if (!passwordStrRegex.test(passwordValue)) {
        setIsPwStr(false);
      } else {
        setIsPwStr(true);
      }
    },
    [password]
  );
  // 비밀번호 체크
  const onChangePasswordCheck = useCallback((e) => {
    const passwordC = e.target.value;
    setPasswordCheck(passwordC);
    if (password === passwordC) {
      setIsPasswordCheck(true);
      setPwMsg("");
    } else {
      setIsPasswordCheck(false);
      setPwMsg("비밀번호가 일치하지 않습니다!");
    }
  });

  // 닉네임 중복처리
  const onNicknameCheck = () => {
    if (nickname.length === 0) {
      $openModal({
        type: "alert",
        props: {
          message: "닉네임을 입력해주세요",
          type: "info",
        },
      });
      return;
    } else if (nickname.length < 2 || nickname.length > 15) {
      $openModal({
        type: "alert",
        props: {
          message: "2자이상, 15자 이내로 작성해 주세요",
          type: "info",
        },
      });
    } else {
      NicknameCheck({
        nickname,
      }).then((res) => {
        if (res === undefined) {
          return;
        } else {
          return setOnCheckNickname(true);
        }
      });
    }
  };

  const NicknameCheck = async (post) => {
    try {
      const { data } = await instanceAxios.post(
        "member/validate/nickname",
        post
      );
      if (data.customHttpStatus === 4092) {
        setOnCheckNickname(false);
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      } else if (data.customHttpStatus === 4090) {
        setOnCheckNickname(false);
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      } else {
        setPrevNickname(post.nickname);
        $openModal({
          type: "alert",
          props: {
            message: data.message + "입니다",
            type: "info",
          },
        });
        return data;
      }
    } catch (error) {}
  };

  // 이메일 중복처리
  const onEmailCheck = () => {
    if (email.length === 0) {
      $openModal({
        type: "alert",
        props: {
          message: "이메일을 입력해 주세요",
          type: "info",
        },
      });
    }
    emailCheck({
      email,
    }).then((res) => {
      if (res === undefined) {
        return;
      } else {
        return setOnCheckEmail(true);
      }
    });
  };

  const emailCheck = async (post) => {
    try {
      const { data } = await instanceAxios.post("member/validate/email", post);
      if (data.customHttpStatus === 4091) {
        setOnCheckEmail(false);
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      } else if (data.customHttpStatus === 4090) {
        setOnCheckEmail(false);
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      } else if (data.customHttpStatus === 4000) {
        setOnCheckEmail(false);
        $openModal({
          type: "alert",
          props: {
            message: data.message,
            type: "info",
          },
        });
      } else {
        setPrevEmail(post.email);
        $openModal({
          type: "alert",
          props: {
            message: data.message + "입니다",
            type: "info",
          },
        });
        return data;
      }
    } catch (error) {}
  };

  // 회원가입 버튼 클릭시 실행
  const postSignUp = async (post) => {
    try {
      const { data } = await instanceAxios.post("member/signup", post);
      if (data.customHttpStatus === 2000) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 회원가입 버튼 클릭시 실행
  const onSignUpBtn = () => {
    uploadFiles(s3image).then((res) => {
      const profileImg = res === null ? null : res.Location;
      postSignUp({
        nickname,
        email,
        password,
        profileImg,
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
          closeModal?.();
        }
      });
    });
  };
  useEffect(() => {
    if (passwordCheck === "" || null || undefined) {
      setIsPasswordCheck(false);
      setPwMsg("");
    } else if (password === passwordCheck) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
      setPwMsg("비밀번호가 일치하지 않습니다!");
    }
  }, [password, passwordCheck, isPasswordCheck, passwordCheck]);

  const UpHandler = (e) => {
    if (e.key === "Enter") {
      onSignUpBtn();
    }
  };
  return (
    <Modal onClose={onClose}>
      <SignUpTotal>
        <SignUpImgDiv>
          <input
            type="file"
            id="upload"
            ref={imgRef}
            onChange={SignUpImg}
            accept="image/*"
          />
          <label htmlFor="upload">+</label>
          <img src={previewImg} onClick={() => imgRef.current.click()} />
        </SignUpImgDiv>
        <SignUpMiddleDiv>
          <SignUpTitle>Nickname</SignUpTitle>
          {(onCheckNickname && isNickname) === false ? (
            <SignUpDivBox>
              <input
                type="text"
                onChange={onChangeNickname}
                maxLength={15}
                placeholder="닉네임을 입력해 주세요"
                onKeyPress={UpHandler}
              />
              <button onClick={onNicknameCheck}>중복체크</button>
            </SignUpDivBox>
          ) : (
            <SignUpDivBox style={{ backgroundColor: "#ff4d00" }}>
              <input
                type="text"
                onChange={onChangeNickname}
                maxLength={15}
                placeholder="닉네임을 입력해 주세요"
                style={{ color: "white" }}
                onKeyPress={UpHandler}
              />
              <button
                onClick={onNicknameCheck}
                style={{ border: "1px solid white", color: "white" }}
              >
                중복체크
              </button>
            </SignUpDivBox>
          )}
          <SignUpTitle>E-mail</SignUpTitle>
          {(onCheckEmail && isEmail) === false ? (
            <SignUpDivBox>
              <input
                type="email"
                onChange={onChangeEmail}
                placeholder="이메일을 입력해 주세요"
                onKeyPress={UpHandler}
              />
              <button onClick={onEmailCheck}>중복체크</button>
            </SignUpDivBox>
          ) : (
            <SignUpDivBox style={{ backgroundColor: "#ff4d00" }}>
              <input
                type="email"
                onChange={onChangeEmail}
                placeholder="이메일을 입력해 주세요"
                style={{ color: "white" }}
                onKeyPress={UpHandler}
              />
              <button
                onClick={onEmailCheck}
                style={{ border: "1px solid white", color: "white" }}
              >
                중복체크
              </button>
            </SignUpDivBox>
          )}

          <SignUpTitle>Password</SignUpTitle>
          {!(isPwLength && isPwSymbol && isPwStr && isPwNum) ? (
            <SignUpDivBox>
              <input
                type="password"
                onChange={onChangePassword}
                placeholder="비밀번호를 입력해 주세요"
              />
            </SignUpDivBox>
          ) : (
            <SignUpDivBox style={{ backgroundColor: "#ff4d00" }}>
              <input
                type="password"
                onChange={onChangePassword}
                placeholder="비밀번호를 입력해 주세요"
                style={{ color: "white" }}
                onKeyPress={UpHandler}
              />
            </SignUpDivBox>
          )}

          <PasswordCheck>
            {!(isPwLength && isPwSymbol && isPwStr && isPwNum) ? (
              <>
                <div
                  style={
                    isPwLength
                      ? { backgroundColor: "#ff4d00", color: "white" }
                      : {}
                  }
                >
                  8글자 이상
                </div>
                <div
                  style={
                    isPwSymbol
                      ? { backgroundColor: "#ff4d00", color: "white" }
                      : {}
                  }
                >
                  특수기호
                </div>
                <div
                  style={
                    isPwStr
                      ? { backgroundColor: "#ff4d00", color: "white" }
                      : {}
                  }
                >
                  문자
                </div>
                <div
                  style={
                    isPwNum
                      ? { backgroundColor: "#ff4d00", color: "white" }
                      : {}
                  }
                >
                  숫자
                </div>
              </>
            ) : (
              ""
            )}
          </PasswordCheck>
          <SignUpTitle style={{ marginTop: "5px" }}>Password Check</SignUpTitle>
          {(isPwLength &&
            isPwSymbol &&
            isPwStr &&
            isPwNum &&
            isPasswordCheck) === false ? (
            <SignUpDivBox>
              <input
                type="password"
                placeholder="비밀번호 한번더 확인해 주세요"
                onChange={onChangePasswordCheck}
                onKeyPress={UpHandler}
              ></input>
              <p style={{ color: "rgba(245, 15, 0, 0.6)" }}>{pwMsg}</p>
            </SignUpDivBox>
          ) : (
            <SignUpDivBox style={{ backgroundColor: "#ff4d00" }}>
              <input
                type="password"
                placeholder="비밀번호 한번더 확인해 주세요"
                onChange={onChangePasswordCheck}
                style={{ color: "white" }}
                onKeyPress={UpHandler}
              ></input>
            </SignUpDivBox>
          )}

          <SignUpClick
            onClick={onSignUpBtn}
            disabled={
              !(
                isPasswordCheck &&
                isNickname &&
                isEmail &&
                onCheckNickname &&
                onCheckEmail &&
                isPwLength &&
                isPwNum &&
                isPwStr &&
                isPwStr
              )
            }
            style={
              !(
                isPasswordCheck &&
                isNickname &&
                isEmail &&
                onCheckNickname &&
                onCheckEmail &&
                isPwLength &&
                isPwNum &&
                isPwStr &&
                isPwSymbol
              )
                ? { backgroundColor: "" }
                : { backgroundColor: "#ff4d00" }
            }
          >
            <h2>SIGN</h2>
            <Img wd="15rem" src={log} />
            <h2>N</h2>
          </SignUpClick>
        </SignUpMiddleDiv>
      </SignUpTotal>
    </Modal>
  );
};

export default SignUpModal;

const SignUpTotal = styled.div`
  width: 500px;
  height: 600px;
  z-index: 1050;
  margin: 50px auto;
`;

const SignUpMiddleDiv = styled.div`
  margin-top: 30px;
`;

const SignUpTitle = styled.h2`
  margin: 15px auto 8px;
  width: 30rem;
`;

const SignUpDivBox = styled.div`
  margin: 0 auto;
  width: 30rem;
  height: 4rem;
  border: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  input {
    width: 23rem;
    border-radius: 10px;
    height: 3.7rem;
    background-color: transparent;
    border: transparent;
    padding-left: 15px;
  }
  button {
    width: 6rem;
    height: 2.8rem;
    font-size: 1.3rem;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    :hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
  p {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 10px;
  }
`;

const PasswordCheck = styled.div`
  width: 30rem;
  margin: 10px auto 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  div {
    padding: 1px 7px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
`;

const SignUpImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    display: none;
  }
  label {
    position: absolute;
    font-size: 5rem;
    color: #ff4d00;
    margin-bottom: 1rem;
  }

  img {
    width: 13rem;
    height: 13rem;
    border-radius: 70%;
    border: 3px solid #ff4d00;
    z-index: 100;
  }
`;

const SignUpClick = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 4rem;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border: transparent;
  color: white;
  margin: 30px auto 0;
  h2 {
    font-size: 20px;
  }
  img {
    width: 4.5rem;
    height: 30px;
  }
`;
