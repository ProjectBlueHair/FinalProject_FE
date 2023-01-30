import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./page/Detail";
import Tag from "./component/tag/Tag";
import MainPage from "./page/MainPage";
import PostingPage from "./page/PostingPage";
import TypeModalContainer from "./modal/TypeModalContainer";

import MyPage from "./page/MyPage";
import SetPage from "./page/SetPage";

import PostingReactQueryTest from "./component/posting/PostingReactQueryTest";
import ChatPage from "./page/ChatPage";
import PostingPageNext from "./page/PostingPageNext";

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
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <TypeModalContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/mypage/:nickname" element={<MyPage />} />
          <Route path="/setpage" element={<SetPage />} />
          <Route path={`${PATH.tag}/:tag`} element={<Tag />} />
          <Route path={'/posttest'} element={<PostingPage />} />
          <Route path={PATH.post} element={<PostingPageNext />} />
          <Route path={`${PATH.edit}/:id`} element={<PostingPageNext />} />
          <Route path={`${PATH.collabo}/:id`} element={<PostingPageNext />} />
          <Route path={`${PATH.chat}`} element={<ChatPage />} />
          <Route path={`/test`} element={<PostingReactQueryTest />} />
          <Route
            path={`${PATH.collaboRequested}/:id/:postId`}
            element={<PostingPageNext />}
          />
          {/* <Route
            path={`${PATH.collaboRequested}/:id`}
            element={<PostingPage />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
