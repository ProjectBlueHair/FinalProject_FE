import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../dataManager/interceptors";
import { AppState } from "../config";
import { CurrentMusic, LikeModel, Post } from "../../component/main/MainModel.types";

export interface MainState {
  posts: Post[];
  nextPage: number;
  currentMusic: CurrentMusic;
  alarmCount: number;
  search: { isOpen: boolean; value: string };
  tag: string;
  isLoading: boolean;
  error: unknown;
}
const initialState = {
  posts: [] as Post[],
  nextPage: 0,
  currentMusic: { post: {}, isPlayingMain: false, isPlayingPlayer: false },
  alarmCount: 0,
  search: { isOpen: false, value: "" },
  tag: "",
  isLoading: false,
  error: null,
} as MainState;

export const alarmSelector = (state: AppState) => state.main.alarmCount;
export const searchSelector = (state: AppState) => state.main.search;
export const mainErrorSelector = (state: AppState) => state.main.error;
const findPostIndex = (posts: Post[], payload: string | number) => {
  return posts.findIndex((post) => post.id === payload);
};
export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    __MainTogglePlay: (state, action) => {
      state.currentMusic = {
        ...state.currentMusic,
        isPlayingMain: action.payload,
        isPlayingPlayer: action.payload,
      };
    },
    __PlayerTogglePlay: (state, action) => {
      state.currentMusic = {
        ...state.currentMusic,
        isPlayingMain: action.payload,
        isPlayingPlayer: action.payload,
      };
    },
    __playDifferentSrc: (state, action) => {
      const index = findPostIndex(state.posts, action.payload);
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
        };
      }
    },
    __PlayPrevious: (state, action) => {
      const index = findPostIndex(state.posts, action.payload);
      if (index !== 0) {
        state.currentMusic = {
          ...state.currentMusic,
          post: state.posts[index - 1],
        };
      }
    },
    __mainCleanUp: (state) => {
      return initialState;
    },
    __clearAlarmCount: (state) => {
      state.alarmCount = 0;
    },
    __typeSearch: (state, { payload }) => {
      state.search.value = payload;
    },
    __openSearch: (state, { payload }) => {
      state.search.isOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPostList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostList.fulfilled, (state, { payload }) => {
        console.log("__getPostList fulfilled payload : ", payload);
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
        __mainPostLike.fulfilled,
        (state, { payload }: { payload: LikeModel | undefined }) => {
          state.posts[payload!.index].liked = payload!.isLiked;
          state.posts[payload!.index].likeCount = payload!.likeCount;
        }
      )
      .addCase(__mainPostLike.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(__getAlarm.fulfilled, (state, { payload }) => {
        state.alarmCount = payload.unreadNotificationCount;
      })
      .addCase(__readAlarm.fulfilled, (state, { payload }) => {
        state.alarmCount = payload.unreadNotificationCount;
      })

  },
});
export const __getPostList = createAsyncThunk(
  "__getPostList",
  async (payload: number, thunkAPI) => {
    try {
      console.log("payload,,,", payload);
      const { data } = await apiClient.get(
        `/post?page=${Number(payload)}&size=15`
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __mainPostLike = createAsyncThunk(
  "__mainPostLike",
  async (payload: { postId: string | number; index: number }, thunkAPI) => {
    try {
      const { data } = await apiClient.post(`/post/like/${payload.postId}`);
      const resData: LikeModel = { ...data.data, index: payload.index };
      return resData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//todo: headerSlice 하나 더 만들어서 분리하는게 좋을까?
export const __getAlarm = createAsyncThunk(
  "__getAlarm",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`/notification/count`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __readAlarm = createAsyncThunk(
  "__readAlarm",
  async (payload: string | number, thunkAPI) => {
    try {
      const { data } = await apiClient.post(`/notification/${payload}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const {
  __MainTogglePlay,
  __playDifferentSrc,
  __typeSearch,
  __PlayerTogglePlay,
  __PlayPrevious,
  __playNext,
  __mainCleanUp,
  __clearAlarmCount,
} = mainSlice.actions;
export default mainSlice.reducer;
