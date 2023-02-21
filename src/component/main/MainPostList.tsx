import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  MainState,
  __getPostList,
  __getPostsQuery,
} from "../../redux/slice/mainSlice";
import { useGetPostsQuery } from "../../service/audios";
import MainPost from "./MainPost";
const MainPostList = () => {
  const { tag } = useParams();
  const target = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const scrollArea = useRef(null);
  const [trigger, setTrigger] = useState(false);
  const dispatch = useAppDispatch();
  const { posts, nextPage } = useAppSelector<MainState>((state) => state.main);
  const { data, isLoading } = useGetPostsQuery(nextPage);
  const [isLastPage, setIsLastPage] = useState(false);
  console.log("main post data", data);
  console.log("main post isLoading", isLoading);
  console.log("main post page", page);

  let options = {
    root: scrollArea.current,
    rootMargin: "30px",
    threshold: 1,
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(__getPostsQuery(data));
    }
    if (data && data?.length === 0) setIsLastPage(true)
    return () => {
      console.log("unmount");
    };
  }, [page, isLoading]);

  const callback: IntersectionObserverCallback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("triggered....isLastPage", isLastPage);
        // setTrigger((prev) => !prev);
        if (!isLastPage) setPage((prev) => prev + 1);
      }
    });
  };
  useEffect(() => {
    const io = new IntersectionObserver(callback, options);
    io.observe(target.current!);
  }, []);

  return (
    <ScrollContainer ref={scrollArea}>
      <PostListContainer>
        {posts?.map((post, index) => (
          <MainPost key={post.id} post={post} index={index} />
        ))}
        <div data-name="target" ref={target}></div>
      </PostListContainer>
      {isLoading && <Loading />}
    </ScrollContainer>
  );
};

export default MainPostList;
const PostListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    padding: 0 5rem;
  }
`;
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  padding: 0 0 2rem;
`;

export const Loading = styled.div`
  margin: 2rem;
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--ec-main-color);
    border-color: var(--ec-main-color) transparent var(--ec-main-color)
      transparent;
    animation: lds-dual-ring 0.6s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
