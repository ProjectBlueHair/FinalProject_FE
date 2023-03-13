import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../dataManager/interceptors";
import {
  CollaboRequestedInfo,
  PostingFormDto,
} from "../../component/posting/PostingModel.types";
import { AppState } from "../config";

export const formSelector = {
  title: (state: AppState) => state.posting.form.title,
  postImg: (state: AppState) => state.posting.form.postImg,
  collaboNotice: (state: AppState) => state.posting.form.collaboNotice,
  contents: (state: AppState) => state.posting.form.contents,
  form: (state: AppState) => state.posting.form,
};

export const CollaboRequestedFormSelector = (state: AppState) =>
  state.posting.collaboRequestedForm;

export const postingErrorSelector = (state: AppState) => state.posting.error;

export interface PostingState {
  form: PostingFormDto;
  collaboRequestedForm: { title: string; explain: string };
  isLoading: boolean;
  error: any;
}

const initialState = {
  form: { contents: "", collaboNotice: "", postImg: "", title: "" },
  collaboRequestedForm: { title: "", explain: "" },
  isLoading: false,
  error: null,
} as PostingState;

export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    __form: (state, { payload }) => {
      state.form = { ...state.form, ...payload };
    },
    __cleanUpPost: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPostInfo.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(__getPostInfo.fulfilled, (state, { payload }) => {
        state.form.title = payload.title;
        state.form.postImg = payload.postImg;
        state.isLoading = false;
      })
      .addCase(
        __getCollaboRequestedInfo.fulfilled,
        (state, { payload }: { payload: CollaboRequestedInfo }) => {
          state.collaboRequestedForm = {
            ...state.collaboRequestedForm,
            title: payload.nickname + "님의 콜라보 요청 메세지",
            explain: payload.contents,
          };
        }
      )
      .addCase(__getCollaboRequestedInfo.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const __getPostInfo = createAsyncThunk(
  "__getPostInfo",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`/post/details/${payload}`);
      console.log("postinfo(detail)", data);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getCollaboRequestedInfo = createAsyncThunk(
  "__getCollaboRequestedInfo",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`/collabo/${payload}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadNewPost = async (data: FormData) => {
  return await apiClient.post(`/post/new`, data);
};
export const collaboRequest = async (data: any, postId: string | number) => {
  return await apiClient.post(`/post/${postId}/collabo`, data);
};
export const collaboApprove = async (collaboId: string | number) => {
  return await apiClient.post(`/collabo/${collaboId}`);
};
export const { __cleanUpPost, __form } = postingSlice.actions;
export default postingSlice.reducer;
