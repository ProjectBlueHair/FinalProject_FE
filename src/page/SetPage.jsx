import React from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import SetTotal from "../component/setpage/SetTotal";

const SetPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
      <Header />
      <SetTotal />
    </Flex>
  );
};

export default SetPage;
