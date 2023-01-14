import React from "react";
import { Audio } from "../../redux/slice/postingSlice";
import Flex from "../elem/Flex";
import PostingAudioControlBox from "./PostingAudioControlBox";
const PostingAudioBar: React.FC<Audio> = (props) => {
  return (
    <Flex type="audioBar">
      <PostingAudioControlBox isNew={props.isNewAudio} />
      <div>hi</div>
    </Flex>
  );
};

export default PostingAudioBar;
