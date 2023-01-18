import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";

const initialState = {
  comment: [],
};
// 댓글 조회
export const __getComment = createAsyncThunk(
  "get/Comment",
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instanceAxios.get(`post/${payload}/comment`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 댓글 작성
export const __postComment = createAsyncThunk(
  "post/Comment",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.post(`comment/${payload.id}`, {
        contents: payload.mainContent,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 댓글 삭제
export const __deleteComment = createAsyncThunk(
  "delete/Comment",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.delete(`comment/${payload}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 댓글 수정
export const __putComment = createAsyncThunk(
  "put/Comment",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.put(`comment/${payload.comID}`, {
        contents: payload.comUpdateInput,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 대댓글
export const __postCommentSub = createAsyncThunk(
  "post/Comment",
  async (payload, thunkAPI) => {
    try {
      await instanceAxios.post(
        `comment/${Number(payload.id)}/${payload.detailId}`,
        {
          contents: payload.comSubV,
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: {
    [__getComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
    },
  },
});

export default commentSlice.reducer;
