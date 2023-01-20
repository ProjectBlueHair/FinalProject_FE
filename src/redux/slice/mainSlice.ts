import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
import { handleError } from "../../dataManager/errorHandler";
import { CurrentMusic, LikeModel, Post } from "../../model/PostModel";
import { __postLike } from "./detailSlice";
export const __getPostList = createAsyncThunk(
  "__getPostList",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`/post?page=${Number(payload)}`);
      return handleError(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __mainPostLike = createAsyncThunk(
  "__mainPostLike",
  async (payload: string | number, thunkAPI) => {
    try {
      const { data } = await instanceAxios.post(`post/like/${payload}`);
      const resData: LikeModel = { ...handleError(data), postId: payload };
      return resData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export interface MainState {
  posts: Post[];
  nextPage: number;
  currentMusic: CurrentMusic;
  isLoading: boolean;
  error: unknown;
}
const findPostIndex = (posts: Post[], payload: string | number) => {
  return posts.findIndex((post) => post.id === payload);
};
export const mainSlice = createSlice({
  name: "main",
  initialState: {
    posts: [] as Post[],
    nextPage: 0,
    currentMusic: { post: {}, isPlayingMain: false, isPlayingPlayer: false },
    isLoading: false,
    error: null,
  } as MainState,
  reducers: {
    __MainTogglePlay: (state, action) => {
      state.currentMusic.isPlayingMain = action.payload;
    },
    __PlayerTogglePlay: (state, action) => {
      state.currentMusic.isPlayingPlayer = action.payload;
    },
    __playDifferentSrc: (state, action) => {
      const index = findPostIndex(state.posts, action.payload);
      console.log("index", index);
      state.currentMusic = {
        ...state.currentMusic,
        post: state.posts[index],
        isPlayingMain: true,
      };
    },
    __playNext: (state, action) => {
      const index = findPostIndex(state.posts, action.payload);
      if (index !== state.posts.length - 1) {
        state.currentMusic = {
          ...state.currentMusic,
          post: state.posts[index + 1],
          isPlayingMain: true,
        };
      }
    },
    __PlayPrevious: (state, action) => {
      const index = findPostIndex(state.posts, action.payload);
      if (index !== 0) {
        state.currentMusic = {
          ...state.currentMusic,
          post: state.posts[index - 1],
          isPlayingMain: true,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPostList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (state.nextPage === 0) {
          state.currentMusic = {
            ...state.currentMusic,
            post: payload[0],
          };
        }
        state.posts =
          state.nextPage === 0 ? payload : state.posts.concat(payload);
        state.nextPage = state.nextPage + 1;
      })
      .addCase(__getPostList.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(
        __postLike.fulfilled,
        (state, { payload }: { payload: LikeModel | undefined }) => {
          const index = findPostIndex(state.posts, payload!.postId);
          state.posts[index].isLiked = payload!.isLiked;
          state.posts[index].likeCount = payload!.likeCount;
        }
        
      ).addCase(
        __postLike.rejected,
        (state, { payload }) => {
          state.error = payload
        }
        
      )
  },
});
export const {
  __MainTogglePlay,
  __playDifferentSrc,
  __PlayerTogglePlay,
  __PlayPrevious,
  __playNext,
} = mainSlice.actions;
export default mainSlice.reducer;
