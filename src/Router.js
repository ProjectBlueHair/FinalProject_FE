import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./page/Detail";
import Tag from "./component/tag/Tag";
import MainPage from "./page/MainPage";
import PostingPage from "./page/PostingPage";
import TypeModalContainer from "./modal/TypeModalContainer";
import MyPage from "./page/MyPage";
import SetPage from "./page/SetPage";
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
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <TypeModalContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/setpage" element={<SetPage />} />
          <Route path={`${PATH.tag}/:tag`} element={<Tag />} />
          <Route path={PATH.post} element={<PostingPage />} />
          <Route path={`${PATH.edit}/:id`} element={<PostingPage />} />
          <Route path={`${PATH.collabo}/:id`} element={<PostingPage />} />
          <Route
            path={`${PATH.collaboRequested}/:id`}
            element={<PostingPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
