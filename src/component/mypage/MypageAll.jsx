import styled from "styled-components";
import MypageLeft from "./MypageLeft";
import MypageRight from "./MypageRight";

const MypageAll = () => {
  return (
    <MypageTotalDiv>
      <MypageLeft />
      <MypageRight />
    </MypageTotalDiv>
  );
};

export default MypageAll;

const MypageTotalDiv = styled.div`
  display: flex;
  width: 100%;
  overflow-y: hidden;
`;
