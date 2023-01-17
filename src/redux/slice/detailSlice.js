import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";

const initialState = {
  detail: [],
  collabo: [],
  music: [],
};

export const __getDetail = createAsyncThunk(
  "get/Detail",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`post/details/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailCollabo = createAsyncThunk(
  "get/DetailCollabo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`post/${payload}/collabo`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailMusic = createAsyncThunk(
  "get/DetailMusic",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`post/${payload}/music`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __putDetailFollow = createAsyncThunk(
  "put/DetailFollow",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.put("member/follow", payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLike = createAsyncThunk(
  "post/DetailPostLike",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.post(`post/like/${payload}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  extraReducers: {
    [__getDetail.fulfilled]: (state, action) => {
      state.detail = action.payload;
    },
    [__getDetailCollabo.fulfilled]: (state, action) => {
      state.collabo = action.payload;
    },
    [__getDetailMusic.fulfilled]: (state, action) => {
      state.music = action.payload;
    },
  },
});

export default detailSlice.reducer;
