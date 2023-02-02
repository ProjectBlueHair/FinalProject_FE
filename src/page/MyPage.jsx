import React from "react";
import MypageAll from "../component/mypage/MypageAll";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import MainAudioPlayer from "../component/main/MainAudioPlayer";

const MyPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
      <Header />
      <MypageAll />
      {/* <MainAudioPlayer /> */}
    </Flex>
  );
};

export default MyPage;
