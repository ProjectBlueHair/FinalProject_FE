import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/config";
import {
  titleSelector,
} from "../../redux/slice/postingSlice";

const PostingTitle: React.FC = () => {
  const title = useAppSelector(titleSelector);
  const defaultTitle = "Your Music Title";

  return <Title>{!title ? defaultTitle : title}</Title>;
};

export default PostingTitle;
const Title = styled.div`
  font-size: 3rem;
`;
