import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingFormCollabo from "../component/posting/PostingFormCollabo";
import PostingForm from "../component/posting/PostingForm";
import PostingTitle from "../component/posting/PostingTitle";
import PostingTotalPlay from "../component/posting/PostingTotalPlay";
import { PATH } from "../Router";
import PostingCollaboRequested from "../component/posting/PostingCollabReqeusted";
import { getCookies } from "../dataManager/cookie";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import useTypeModal from "../modal/hooks/useTypeModal";

export const AUDIO_BAR_GAP = "1.5rem";

const PostingPage = () => {
  const location = useLocation();
  const CURRENT_PATH = location.pathname.split("/")[1];
  const POSTPAGE = PATH.post.split("/")[1] === CURRENT_PATH;
  const EDITPAGE = PATH.edit.split("/")[1] === CURRENT_PATH;
  const COLLABOPAGE = PATH.collabo.split("/")[1] === CURRENT_PATH;
  const COLLABOREQUESTED = PATH.collaboRequested.split("/")[1] === CURRENT_PATH;
  const { $openModal } = useTypeModal();

  !getCookies("accesstoken") &&
    $openModal({
      type: "alert",
      props: {
        message: "로그인이 필요한 페이지 (기능) 입니다.",
        type: ALERT_TYPE.info,
        to: PATH.main,
      },
    });
  return (
    <Flex direction="column" justify="flex-start" >
      <Header />
      <AudioBarsBackground gap={AUDIO_BAR_GAP}>
        <PostingTitle />
        <PostingTotalPlay />
        <PostingAudioBars />
        <PostingFormAudio />
      </AudioBarsBackground>
      <Flex align="flex-start" mg="4rem 0">
        {POSTPAGE && <PostingForm isEdit={EDITPAGE} />}
        {COLLABOPAGE && <PostingFormCollabo />}
        {COLLABOREQUESTED && <PostingCollaboRequested />}
      </Flex>
    </Flex>
  );
};
const origin = window.location.origin + "/audio-bars-bg.png";

export default PostingPage;
export const AudioBarsBackground = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 3.5rem 4rem 2rem;
  gap: ${({ gap }) => gap};

  background-image: linear-gradient(
      rgba(240, 240, 240, 0.5),
      rgba(255, 255, 255, 1)
    ),
    url(${origin});
`;
