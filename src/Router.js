import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tag from "./component/tag/Tag";
import MainPage from "./page/MainPage";
export const PATH = {
  main: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  tag: "/tag",
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tag/:tag" element={<Tag />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
