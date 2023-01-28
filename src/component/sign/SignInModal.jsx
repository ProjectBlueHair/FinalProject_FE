import Modal from "../modal/Modal";
import React, { useState } from "react";
import useModal from "../modal/useModal";
import styled from "styled-components";
import { setCookie } from "../../dataManager/cookie";
import { instanceAxios } from "../../dataManager/apiConfig";
import Img from "../elem/Img";
import { mainLogo, log } from "../../asset/pic";
import { useAppDispatch } from "../../redux/config";
import { __getGeneralUserInfo } from "../../redux/slice/userSlice";
import useTypeModal from "../../modal/hooks/useTypeModal";

const SignInModal = ({ onClose }) => {
  const { openModal } = useModal();
  const { closeModal } = useModal();
  const dispatch = useAppDispatch()
  const { $openModal, $closeModal } = useTypeModal();

  const onClickSignUpModal = () => {
    openModal({ type: "signUp" });
  };

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const onChangeSignIn = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  };

  const postSignIn = async (post) => {
    try {
      const data = await instanceAxios.post("member/login", post);
      if (data.status === 200) {
        return data;
      } else {
        $openModal({
          type: "alert",
          props: {
            message: "아이디, 비밀번호를 잘못입력하셨습니다",
            type: "info",
          },
        });
        // alert("아이디, 비밀번호를 잘못입력하셨습니다");
      }
    } catch (error) {}
  };

  const onClickSignIn = () => {
    if (signIn.email === "") {
      $openModal({
        type: "alert",
        props: {
          message: "이메일을 입력해주세요",
          type: "info",
        },
      });
    } else if (signIn.password === "") {
      $openModal({
        type: "alert",
        props: {
          message: "비밀번호를 입력해 주세요",
          type: "info",
        },
      });
    } else {
      postSignIn(signIn).then((res) => {
        if (res === undefined) {
          return;
        } else if (res.data.customHttpStatus === 4041) {
          $openModal({
            type: "alert",
            props: {
              message: res.data.message,
              type: "info",
            },
          });
        } else if (res.data.customHttpStatus === 4040) {
          $openModal({
            type: "alert",
            props: {
              message: res.data.message,
              type: "info",
            },
          });
        } else if (res.data.customHttpStatus === 4000) {
          $openModal({
            type: "alert",
            props: {
              message: res.data.message,
              type: "info",
            },
          });
        } else {
          setCookie("accesstoken", res.headers.accesstoken, {
            path: "/",
            maxAge: 1800,
          });
          setCookie("refreshtoken", res.headers.refreshtoken, {
            path: "/",
            maxAge: 1800,
          });
          
          alert(res.data.message);
          dispatch(__getGeneralUserInfo())
          $openModal({
            type: "alert",
            props: {
              message: res.data.message,
              type: "info",
            },
          });
          closeModal?.();
        }
      });
    }
  };

  return (
    <Modal onClose={onClose}>
      <SignInTotal>
        <SignLogoTitle>
          <Img cursor="pointer" wd="35rem" src={mainLogo} />
          <h1>우연처럼, 운명처럼 만들어지는 합주</h1>
        </SignLogoTitle>
        <SignTitleInput>
          <div>E-mail</div>
          <input
            type="text"
            name="email"
            onChange={onChangeSignIn}
            placeholder="이메일을 입력해 주세요"
          />
          <div>Password</div>
          <input
            type="password"
            name="password"
            onChange={onChangeSignIn}
            placeholder="비밀번호 입력해 주세요"
          />
          <SignButton onClick={onClickSignIn}>
            <h2>LOG</h2>
            <Img wd="15rem" src={log} />
            <h2>N</h2>
          </SignButton>
        </SignTitleInput>
        <SocialLogin>
          <button>
            <img
              src="https://w.namu.la/s/059f8bf3e629d3f2e343fe3f3f10809022d58800962db675d233429660bf98d9ceccd60e23b1324d090c87485833b10c2c4503c93a230003ba67d5fcafa527934b23df1ee2f666d6df84170dc02bfd188a5247adc86510eda15d18429f5d2d6c"
              alt=""
            />
          </button>
          <button>
            <img
              src="https://w.namu.la/s/86283733ababc9c88b9a5439aee56a911be2ad08d1685fd3cc130cf3bee72c919dfb2ea3c3a2c62093afa4d6e6c85f9177e5eb1301d8757038d59f557141d0b91b0c051fa4fccb8ee0e911930d50aaeb799ccb803bd92752dd69a7384c1d487a"
              alt=""
            />
          </button>
        </SocialLogin>
        <SocialLogin>
          <SignUpBtn onClick={onClickSignUpModal}>회원가입하기</SignUpBtn>
        </SocialLogin>
      </SignInTotal>
    </Modal>
  );
};

export default SignInModal;

const SignInTotal = styled.div`
  margin-top: 100px;
  width: 100%;
`;

const SignLogoTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 10px 0;
    font-size: 2.3rem;
  }
`;

const SignTitleInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  font-size: 20px;
  margin: 3rem 0 0 7.5rem;
  div {
    margin: 10px 0;
  }
  input {
    width: 36rem;
    height: 4rem;
    border: transparent;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    padding-left: 20px;
  }
  button {
    border-radius: 20px;
    margin-top: 3rem;
    height: 4rem;
    width: 36rem;
    border: transparent;
    background-color: #ff4d00;
    color: white;
  }
  hr {
    width: 100px;
    color: black;
  }
`;
//
const SignButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 20px;
  }
  img {
    width: 4.5rem;
    height: 30px;
  }
  :hover {
    background-color: #e34501;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  border: transparent;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 0 0;
  gap: 30px;
  img {
    width: 40px;
    border-radius: 90%;
  }
  button {
    border: transparent;
    background-color: transparent;
  }
`;

const SignUpBtn = styled.button`
  margin: 0 auto;
  font-size: 1.7rem;
  border-bottom: 2px solid red;
`;
