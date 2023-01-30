import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainPost from "./MainPost";
import { MainState, __getPostList } from "../../redux/slice/mainSlice";
import { useAppDispatch, useAppSelector } from "../../redux/config";
const MainPostList = () => {
  const target = useRef<HTMLDivElement>(null);
  const scrollArea = useRef(null);

  const [trigger, setTrigger] = useState(false);

  const dispatch = useAppDispatch();
  const { posts, nextPage, isLoading, error } = useAppSelector<MainState>(
    (state) => state.main
  );
  if (error) {
    alert(''+error);
  }

  let options = {
    root: scrollArea.current,
    rootMargin: "20px",
    threshold: 1,
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(__getPostList(nextPage));
    }
    return () => {};
  }, [trigger]);

  const callback: IntersectionObserverCallback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTrigger((prev) => !prev);
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
