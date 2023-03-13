import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { apiClient } from "../../dataManager/interceptors";

const initialState = {
  comment: [],
  error: "",
};
// 댓글 조회
export const __getComment = createAsyncThunk(
  "get/Comment",
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`post/${payload}/comment`);
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
      await apiClient.post(`comment/${payload.id}`, {
        contents: payload.mainContent,
      });
      return thunkAPI.fulfillWithValue(payload);
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
      await apiClient.delete(`comment/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
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
      await apiClient.put(`comment/${payload.comID}`, {
        contents: payload.comUpdateInput,
      });
      return thunkAPI.fulfillWithValue(payload);
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
      await apiClient.post(
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

export const __likeComment = createAsyncThunk(
  "like/Comment",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await apiClient.post(`comment/like/${payload}`);
      return thunkAPI.fulfillWithValue({ payload, data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getComment.pending, (_state) => {})
      .addCase(__getComment.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(__getComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__deleteComment.pending, (_state) => {})
      .addCase(__deleteComment.fulfilled, (state, action) => {
        console.log(current(state.comment));
        console.log(action.payload);
        state.comment = state.comment.filter((com) => {
          com.replyList = com.replyList.filter((subCom) => {
            if (subCom.id !== action.payload) {
              return subCom;
            }
          });
          if (com.id !== action.payload) {
            return com;
          } else {
            return;
          }
        });
      })
      .addCase(__deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__putComment.pending, (_state) => {})
      .addCase(__putComment.fulfilled, (state, action) => {
        state.comment = state.comment.filter((com) => {
          com.replyList = com.replyList.filter((subCom) => {
            if (subCom.id === action.payload.comID) {
              return (subCom.contents = action.payload.comUpdateInput);
            } else {
              return com;
            }
          });
          if (com.id === action.payload.comID) {
            return (com.contents = action.payload.comUpdateInput);
          } else {
            return com;
          }
        });
      })
      .addCase(__putComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__likeComment.pending, (_state) => {})
      .addCase(__likeComment.fulfilled, (state, action) => {
        state.comment.map((com) => {
          com.replyList.map((subCom) => {
            if (subCom.id === action.payload.payload) {
              if (action.payload.data.message === "댓글 좋아요 취소 성공") {
                subCom.isLiked = false;
                subCom.likeCount = subCom.likeCount - 1;
              } else {
                subCom.isLiked = true;
                subCom.likeCount = subCom.likeCount + 1;
              }
            }
          });
          if (com.id === action.payload.payload) {
            if (action.payload.data.message === "댓글 좋아요 취소 성공") {
              com.liked = false;
              com.likeCount = com.likeCount - 1;
            } else {
              com.liked = true;
              com.likeCount = com.likeCount + 1;
            }
          }
        });
      })
      .addCase(__likeComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
