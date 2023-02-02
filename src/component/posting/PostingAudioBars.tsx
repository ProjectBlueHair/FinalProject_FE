import { AUDIO_BAR_GAP } from "../../page/PostingPage";
import { useAppSelector } from "../../redux/config";
import {
  audioControlSelector,
  audiosSelector
} from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import PostingAudioBar from "./PostingAudioBar";
import PostingAudioControlBox from "./PostingAudioControlBox";
export const AUDIO_BAR_RADIUS = "4rem";
export const AUDIO_BAR_HEIGHT = 67;


const PostingAudioBars = () => {
  const audios = useAppSelector(audiosSelector);
  const progressControl = useAppSelector(audioControlSelector);

  return (
    <Flex direction="column" gap={AUDIO_BAR_GAP}>
      {audios.map((audio, index) => (
        <Flex key={index} type="audioBar" isNewAudio={audio.isNewAudio} hg={`${AUDIO_BAR_HEIGHT}px`} radius={AUDIO_BAR_RADIUS}>
          <PostingAudioControlBox
            index={index}
            {...audio}
          />
          <Flex type="audioBarRight">
            <PostingAudioBar {...audio} {...progressControl} index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostingAudioBars;
