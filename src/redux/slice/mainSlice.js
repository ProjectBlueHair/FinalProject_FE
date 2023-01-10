import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import client from "../../dataManager/apiConfig";
export const __getPostList = createAsyncThunk(
  "__getPostList",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const res = await axios.get(`/post?page=${Number(payload)}`);
      return res.data;
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
    currentMusic: { post: {}, isPlaying: false },
    isLoading: false,
    error: null,
  },
  reducers: {
    __togglePlay: (state, action) => {
      state.currentMusic.isPlaying = !state.currentMusic.isPlaying
      // if (state.currentMusic.postId === action.payload) {
      //   console.log('hi')
      //   state.currentMusic.isPlaying = !state.currentMusic.isPlaying;
      // } else {
      //   const index = state.posts.findIndex(
      //     (post) => post.postId === action.payload
      //   );
      //   state.currentMusic = {
      //     ...state.currentMusic,
      //     post: state.posts[index],
      //   };
      // }
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
          console.log('slice', payload.posts[0])
          state.currentMusic = { ...state.currentMusic, post: payload.posts[0] };
        }
        state.nextPage = state.nextPage + 1;

        state.isLastPage = payload.isLastPage;
        state.posts = state.posts.concat(payload.posts);
        // state.posts = [...state.posts, ...payload.posts]
        // state.posts = payload.posts
      });
  },
});
export const { __togglePlay } = mainSlice.actions;
export default mainSlice.reducer;
