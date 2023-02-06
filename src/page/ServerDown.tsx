import MainLogo from "../asset/icon/MainLogo";
import Div from "../component/elem/Div";
import Flex from "../component/elem/Flex";
import theme from "../styles/theme";

const ServerDown = () => {
  return (
    <Flex hg="100vh" gap="2rem">
      <MainLogo wd="5rem"/>
      <Div fs={"3rem"} fc={theme.color.main}>
        서버 점검중 입니다...{" "}
      </Div>
    </Flex>
  );
};

export default ServerDown;