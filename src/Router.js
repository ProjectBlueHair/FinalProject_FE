import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AudioCombiner from "./component/main/AudioCombiner";
import AudioPlayer from "./component/main/AudioPlayerTest";
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
          <Route path="/audio" element={<AudioPlayer />} />
          <Route path="/audio_combine" element={<AudioCombiner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
