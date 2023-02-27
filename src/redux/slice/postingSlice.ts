import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
import { CollaboRequestedInfo, PostingFormDto } from "../../model/PostingModel";
import { Response } from "../../model/ResponseModel";
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
    __cleanUp: () => {
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
      const { data } = await instanceAxios.get(`/post/details/${payload}`);
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
      const { data }: { data: Response } = await instanceAxios.get(
        `/collabo/${payload}`
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadNewPost = async (data: FormData) => {
  return await instanceAxios.post(`/post/new`, data);
};
export const collaboRequest = async (data: any, postId: string | number) => {
  return await instanceAxios.post(`/post/${postId}/collabo`, data);
};
export const collaboApprove = async (collaboId: string | number) => {
  return await instanceAxios.post(`/collabo/${collaboId}`);
};
export const {
  __cleanUp,
  __form,
} = postingSlice.actions;
export default postingSlice.reducer;
