import React from "react";
import DetailTop from "../component/detail/DetailTop";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import { MainContainer } from "./MainPage";

const Detail = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
        <Header />
        <DetailTop />
    </Flex>
  );
};

export default Detail;
