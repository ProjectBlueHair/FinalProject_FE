import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import client from "./apiConfig";

const END_POINT = "/post";
const getPosts = async (url) => {
  return await axios.get(url);
};
const useFetch = (page) => {
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  console.log('usefetch ? ')

  //query API 요청 보내기
  const sendQuery = useCallback(async () => {
    const URL = `${END_POINT}?page=${page}`;

    try {
      setIsLoading(true);
      console.log('FETCH REQUEST PAGE',page)
      const response = await axios.get(URL);
      if (!response) {
        throw new Error(`서버에 오류가 있습니다.`);
      }
      setList((prev) => [...prev, ...response.data.posts]);
      console.log('response.data.posts.length',response.data.posts.length)
      setHasMore(response.data.posts.length > 0);
      setIsLoading(false);
      // setIsLastPage(response.data.isLastPage)
    } catch (e) {
      console.log("오류", e);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { hasMore, list, isLoading, isLastPage };
};
export default useFetch;
