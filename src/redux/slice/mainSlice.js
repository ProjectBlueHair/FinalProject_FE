import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instanceAxios } from "../../dataManager/apiConfig";
export const __getPostList = createAsyncThunk(
  "__getPostList",
  async (payload, thunkAPI) => {
    try {
      // const res = await axios.get(`/post?page=${Number(payload)}`);
      const {data} = await instanceAxios.get(`/post?page=${Number(payload)}`);
      console.log('data',data.data)
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    posts: [],
    nextPage: 0,
    isLastPage: false,
    currentMusic: { post: {}, isPlayingMain: false, isPlayingPlayer: false },
    isLoading: false,
    error: null,
  },
  reducers: {
    __MainTogglePlay: (state, action) => {
      state.currentMusic.isPlayingMain = action.payload;
    },
    __PlayerTogglePlay: (state, action) => {
      state.currentMusic.isPlayingPlayer = action.payload;
    },
    __playDifferentSrc: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.currentMusic.post = state.posts[index];
      state.currentMusic.isPlayingMain = true;
    },
    __playNext: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      if (index !== state.posts.length - 1) {
        state.currentMusic = {
          ...state.currentMusic,
          post: state.posts[index + 1],
          isPlayingMain: true,
        };
      }
    },
    __PlayPrevious: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
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
        console.log('payload',payload)

        state.isLoading = false;
        // if (state.nextPage === 0) {
        //   state.currentMusic = {
        //     ...state.currentMusic,
        //     post: payload.posts[0],
        //   };
        // }
        state.nextPage = state.nextPage + 1;
        state.isLastPage = payload.isLastPage;
        state.posts = state.posts.concat(payload);
      });
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
