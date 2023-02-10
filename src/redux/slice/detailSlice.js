import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";

const initialState = {
  detail: [],
  collabo: [],
  music: [],
  userInfo: [],
  error: "",
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

export const __getUserInfo = createAsyncThunk(
  "get/UserInfo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`member/info`);
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
      return thunkAPI.fulfillWithValue(payload);
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
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getDetail.pending, (_state) => {})
      .addCase(__getDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      })
      .addCase(__getDetail.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__getDetailCollabo.pending, (_state) => {})
      .addCase(__getDetailCollabo.fulfilled, (state, action) => {
        state.collabo = action.payload;
      })
      .addCase(__getDetailCollabo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__getDetailMusic.pending, (_state) => {})
      .addCase(__getDetailMusic.fulfilled, (state, action) => {
        state.music = action.payload;
      })
      .addCase(__getDetailMusic.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__getUserInfo.pending, (_state) => {})
      .addCase(__getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(__getUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__putDetailFollow.pending, (_state) => {})
      .addCase(__putDetailFollow.fulfilled, (state, action) => {
        state.collabo.data?.map((collabo) => {
          if (collabo.nickname === action.payload.myFollowingMemberNickname) {
            if (collabo.isFollowed === false) {
              collabo.followerCount = collabo.followerCount + 1;
            } else {
              collabo.followerCount = collabo.followerCount - 1;
            }
            collabo.isFollowed = !collabo.isFollowed;
          } else {
            return collabo;
          }
        });
      })
      .addCase(__putDetailFollow, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default detailSlice.reducer;
