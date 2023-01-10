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
    isLastPage : false,
    currentMusic: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getPostList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.nextPage = state.nextPage + 1;
        state.isLastPage = payload.isLastPage
        state.posts = state.posts.concat(payload.posts);
        // state.posts = [...state.posts, ...payload.posts]
        // state.posts = payload.posts
      });
  },
});

export default mainSlice.reducer;
