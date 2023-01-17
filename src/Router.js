import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./page/Detail";
import Tag from "./component/tag/Tag";
import MainPage from "./page/MainPage";
import PostingPage from "./page/PostingPage";
export const PATH = {
  main: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  tag: "/tag",
  post: "/post",
  edit: "/edit",
  collabo: "/collabo",
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path={`${PATH.tag}/:tag`} element={<Tag />} />
          <Route path={PATH.post} element={<PostingPage />} />
          <Route path={PATH.edit} element={<PostingPage />} />
          <Route path={PATH.collabo} element={<PostingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
