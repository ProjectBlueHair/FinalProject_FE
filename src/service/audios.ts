import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { factory } from "typescript";
import { instanceAxios, serverURL } from "../dataManager/apiConfig";
import { getCookies } from "../dataManager/cookie";
import { Post } from "../model/MainModel";
import { AudioData } from "../model/PostingModel";
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      path: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ path, method, data, params }) => {
    try {
      const result = await instanceAxios({ url: path, method, data, params });
      return { data: result.data.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
const baseQueryWithRetry = retry(axiosBaseQuery(), { maxRetries: 5 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Audio", "Post"],
  endpoints: (build) => ({
    getAudios: build.query<AudioData[], number>({
      query: (postId) => ({ path: `post/${postId}/music`, method: "get" }),
      providesTags: (_result, _error, postId) => [
        { type: "Audio", id: postId },
      ],
    }),
    getPosts: build.query<Post[], number>({
      query: (page) => ({
        path: `post?page=${Number(page)}&size=6`,
        method: "get",
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Post', id } as const)),
        { type: 'Post' as const, id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAudiosQuery,
useGetPostsQuery } = api;
