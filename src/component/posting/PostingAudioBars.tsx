import { AUDIO_BAR_GAP } from "../../page/PostingPage";
import { useAppSelector } from "../../redux/config";
import { audiosSelector } from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import PostingAudioBar from "./PostingAudioBar";
import PostingAudioControlBox from "./PostingAudioControlBox";
export const AUDIO_BAR_RADIUS = "4rem";
export const AUDIO_BAR_HEIGHT = 67;

const PostingAudioBars = () => {
  const audios = useAppSelector(audiosSelector);
  return (
    <Flex direction="column" gap={AUDIO_BAR_GAP}>
      {audios.map((audio, index) => (
        <Flex
          key={index}
          type="audioBar"
          isNewAudio={audio.isNewAudio}
          hg={`${AUDIO_BAR_HEIGHT}px`}
          radius={AUDIO_BAR_RADIUS}
        >
          <PostingAudioControlBox index={index} {...audio} />
          <Flex type="audioBarRight">
            <PostingAudioBar {...audio} index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostingAudioBars;
