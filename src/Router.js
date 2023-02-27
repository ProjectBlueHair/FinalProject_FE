import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tag from "./component/tag/Tag";
import TypeModalContainer from "./modal/TypeModalContainer";
import Detail from "./page/Detail";
import MainPage from "./page/MainPage";
import PostingPage from "./page/PostingPage";
import KakaoLoginHandler from "./component/sign/KakaoLoginHandler";
import ChatPage from "./page/ChatPage";
import FeedBackForAdmin from "./page/FeedBackForAdmin";
import MyPage from "./page/MyPage";
import SetPage from "./page/SetPage";
import H5SurferTest from "./component/h5wavesurferPlayer/H5SurferTest";


export const PATH = {
  main: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  tag: "/tag",
  post: "/post",
  detail: "/detail",
  edit: "/edit",
  collabo: "/collabo",
  collaboRequested: "/collaboRequested",
  chat: "/chat",
  feedback: "/feedback",
  mypage: "/mypage",
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <TypeModalContainer />
        <Routes>
          <Route path="/:tag" element={<MainPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path={`${PATH.mypage}/:nickname`} element={<MyPage />} />
          <Route path="/setpage" element={<SetPage />} />
          <Route path={`${PATH.tag}/:tag`} element={<Tag />} />
          <Route path={"/posttest"} element={<PostingPage />} />
          <Route path={PATH.post} element={<PostingPage />} />
          <Route path={`${PATH.edit}/:id`} element={<PostingPage />} />
          <Route path={`${PATH.collabo}/:id`} element={<PostingPage />} />
          <Route path={`${PATH.chat}`} element={<ChatPage />} />
          <Route path={`${PATH.feedback}`} element={<FeedBackForAdmin />} />
          <Route path="/login/kakao" element={<KakaoLoginHandler />} />
          <Route path="/audioplay/:id/:postId" element={<H5SurferTest />} />
          <Route path="/audioplay/:id" element={<H5SurferTest />} />
          <Route path="/audioplay" element={<H5SurferTest />} />
          <Route
            path={`${PATH.collaboRequested}/:id/:postId`}
            element={<PostingPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
