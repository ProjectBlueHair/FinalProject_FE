import Flex from "../elem/Flex";
import PostingAudioBar from "./PostingAudioBar";
import { useAppSelector } from "../../redux/config";
import {
  audioControlSelector,
  audiosSelector,
} from "../../redux/slice/postingSlice";
import PostingAudioControlBox from "./PostingAudioControlBox";
import { AUDIO_BAR_GAP } from "../../page/PostingPage";
export const AUDIO_BAR_RADIUS = "4rem";
export const AUDIO_BAR_HEIGHT = "8rem";

const PostingAudioBars = () => {
  const audios = useAppSelector(audiosSelector);
  const progressControl = useAppSelector(audioControlSelector);

  return (
    <Flex direction="column" gap={AUDIO_BAR_GAP}>
      {audios.map((audio, index) => (
        <Flex key={index} type="audioBar" hg={AUDIO_BAR_HEIGHT} radius={AUDIO_BAR_RADIUS}>
          <PostingAudioControlBox
            isNew={audio.isNewAudio}
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
