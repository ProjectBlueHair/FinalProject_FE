import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { instanceAxios, serverURL } from "../dataManager/apiConfig";
import { getCookies } from "../dataManager/cookie";
import { AudioData } from "../model/PostingModel";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await instanceAxios({ url: url, method, data, params });
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

// Define a service using a base URL and expected endpoints
export const audiosApi = createApi({
  reducerPath: "audiosApi",
  baseQuery:  retry(axiosBaseQuery(),{maxRetries:5}),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${serverURL}`,
  //   prepareHeaders: (headers) => {
  //     // By default, if we have a token in the store, let's use that for authenticated requests
  //     const token = getCookies("accesstoken");
  //     if (token) {
  //       headers.set("AccessToken", `${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  endpoints: (build) => ({
    getAudios: build.query<AudioData[], number>({
      query: (postId) => ({ url: `post/${postId}/music`, method: "get" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAudiosQuery } = audiosApi;
