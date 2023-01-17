import { useRef } from "react";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./PostingTotalPlay.css";
import { pause, playPrimary } from "../../asset/pic";
import { iconSize } from "../../GlobalStyle";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  audioControlSelector,
  __seekTo,
  __togglePlay,
} from "../../redux/slice/postingSlice";

const PostingTotalPlay = () => {
  const audioPlayer = useRef<AudioPlayer>(null);
  const dispatch = useAppDispatch();
  const progressConrol = useAppSelector(audioControlSelector);

  const handlePlay = () => {
    dispatch(__togglePlay(true));
  };
  const handlePause = () => {
    dispatch(__togglePlay(false));
  };
  const handleSeeking = () => {
    dispatch(__seekTo(audioPlayer.current?.audio.current?.currentTime));
  };
  return (
    <Flex>
      {progressConrol.src ? (
        <AudioPlayer
          autoPlayAfterSrcChange={false}
          src={progressConrol.src}
          muted={true}
          onPlay={handlePlay}
          onPause={handlePause}
          onSeeking={handleSeeking}
          autoPlay={false}
          ref={audioPlayer}
          layout="horizontal-reverse"
          showJumpControls={false}
          showSkipControls={false}
          timeFormat="auto"
          customProgressBarSection={[
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.CURRENT_TIME,
            // <span>0:00</span>,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          customAdditionalControls={[]}
          customIcons={{
            play: (
              <Img
                mg="0 2rem 0 0"
                type="icon"
                wd={iconSize}
                src={playPrimary}
              />
            ),
            pause: (
              <Img mg="0 2rem 0 0" type="icon" wd={iconSize} src={pause} />
            ),
          }}
          customControlsSection={[]}
        />
      ) : null}
    </Flex>
  );
};

export default PostingTotalPlay;
