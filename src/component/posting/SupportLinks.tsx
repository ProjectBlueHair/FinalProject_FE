import React from "react";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Div from "../elem/Div";
import Flex from "../elem/Flex";

const SupportLinks = () => {
  return (
    <Flex
      hg="100%"
      align="center"
      direction="column"
      bg={theme.color.rgbaBg2}
      justify="flex-start"
      pd="1.3rem"
      radius="20px"
      gap="2rem"
      wd="none"
    >
      <Button
        type="button"
        btnType="link"
        onClick={() => {
          window.open("https://convertio.co/kr/wav-converter/");
        }}
      >
        WAV변환
      </Button>

      <Button
        type="button"
        btnType="link"
        onClick={() => {
          window.open(
            "https://drive.google.com/drive/folders/1Q_bb1FofHO52XaBKMM4Ak7Zow0a1Wk43"
          );
        }}
      >
        샘플 음원
      </Button>
      <Button
        type="button"
        btnType="link"
        onClick={() => {
          window.open("https://studio.gaudiolab.io");
        }}
      >
        음원 추출
      </Button>
      <Div style={{ cursor: "default" }} fc={theme.color.thirdText}>
        Support Links
      </Div>
    </Flex>
  );
};

export default SupportLinks;
