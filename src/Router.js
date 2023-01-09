import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
export const PATH = {
  main: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  
};


const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
