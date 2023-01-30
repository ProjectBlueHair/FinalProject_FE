import React, { Fragment } from "react";
import Flex from "../elem/Flex";
import PostingFormImage from "./PostingFormImage";
import PostingTitle from "./PostingTitle";

const PostingFormImageTItle = () => {
  return (
    <Fragment>
      <Flex className="postingImg" pd="1.5rem">
        <PostingFormImage />
      </Flex>
      <Flex className="postingTitle" align="flex-start" pd="1rem">
        <PostingTitle />
      </Flex>
    </Fragment>
  );
};

export default PostingFormImageTItle;
