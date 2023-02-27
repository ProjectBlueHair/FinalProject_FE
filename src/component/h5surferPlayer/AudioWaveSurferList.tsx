import { useAppSelector } from "../../redux/config";
import { wavesurferSelector } from "../../redux/slice/h5surferSlice";
import Flex from "../elem/Flex";
import AudioWaveSurfer from "./AudioWaveSurfer";
import AudioControlBox from "./AudioControlBox";
export const AUDIO_BAR_RADIUS = "4rem";
export const AUDIO_BAR_HEIGHT = 67;
export const AUDIO_BAR_GAP = "1.5rem";

const AudioWaveSurferList = () => {
  const audios = useAppSelector(wavesurferSelector);
  return (
    <Flex direction="column" gap={AUDIO_BAR_GAP}>
      <div data-testid="testdiv"></div>
      {audios.map((audio, index) => (
        <Flex
          key={index}
          type="audioBar"
          isNewAudio={audio.isAddedAudio || audio.isCollaboRequested}
          hg={`${AUDIO_BAR_HEIGHT}px`}
          radius={AUDIO_BAR_RADIUS}
        >
          <AudioControlBox index={index} {...audio} />
          <Flex type="audioBarRight">
            <AudioWaveSurfer {...audio} index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default AudioWaveSurferList;
