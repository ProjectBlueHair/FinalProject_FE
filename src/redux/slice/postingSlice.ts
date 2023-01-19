import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { App } from "aws-sdk/clients/opsworks";
import { testAudios } from "../../component/main/MockResource";
import { AppState } from "../config";
import {
  ProgressControl,
  Audio,
  Form,
  CollaboAudio,
  AudioData,
  CollaboRequested,
  CollaboRequestData,
} from "../../model/PostingModel";
import { instanceAxios } from "../../dataManager/apiConfig";
import { title } from "process";
import { res } from "../../model/ResponseModel";

export const audiosSelector = (state: AppState) => state.posting.audios;
export const audioControlSelector = (state: AppState) =>
  state.posting.progressControl;
export const titleSelector = (state: AppState) => state.posting.title;
//todo: 대표곡 받는 부분 어떻게 할 것인지 정해야함
export const collaboRequestDataSelector = (state: AppState) =>
  state.posting.collaboRequestData;
export const loadingSelector = (state: AppState) => state.posting.isLoading;
export const errorSelector = (state: AppState) => state.posting.error;
export const collaboDescriptionSelector = (state: AppState) =>
  state.posting.collaboDescription;
export interface PostingState {
  title: string;
  collaboDescription: string;
  audios: Audio[];
  progressControl: ProgressControl;
  audio: Audio;
  // collaboData: CollaboAudio[];
  collaboRequestData: CollaboRequestData;
  isLoading: boolean;
  error: unknown;
}
const initialState = {
  title: "",
  collaboDescription: "",
  audios: [] as Audio[],
  progressControl: { isPlaying: false, seekTo: 0, src: undefined },
  audio: {
    audioData: {} as AudioData,
    isMute: false,
    isNewAudio: false,
    volume: 0.5,
    isSolo: false,
  } as Audio,
  // collaboAudios: [] as CollaboAudio[],
  collaboRequestData: { isValid: false, audios: [] as CollaboAudio[] },
  isLoading: false,
  error: null,
} as PostingState;
export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    __addNewAudio: (state, { payload }) => {
      console.log("__addNewAudio payload", payload);
      state.progressControl.src = state.progressControl.src || payload[0];
      const arr: Audio[] = [];
      const arr2: CollaboAudio[] = [];
      payload.map((musicFile: string) => {
        arr.push({
          ...state.audio,
          isNewAudio: true,
          audioData: { ...state.audio.audioData, musicFile: musicFile },
        });
        arr2.push({ src: musicFile, part: "" });
      });
      state.audios = state.audios.concat(arr);
      state.collaboRequestData.audios =
        state.collaboRequestData.audios.concat(arr2);
    },
    __typeTitle: (state, { payload }) => {
      state.title = payload;
    },
    __togglePlay: (state, { payload }) => {
      state.progressControl.isPlaying = payload;
    },
    __seekTo: (state, { payload }) => {
      state.progressControl.seekTo = payload;
    },
    __setMute: (state, { payload }) => {
      state.audios[payload].volume = state.audios[payload].isMute ? 0.5 : 0.01;
      state.audios[payload].isMute = !state.audios[payload].isMute;
    },
    __setSolo: (state, { payload }) => {
      const arr = [...state.audios];
      const soloIndex = payload;
      //start solo
      if (!state.audios[payload].isSolo) {
        arr.map((audio, index) => {
          arr[index].volume = index === soloIndex ? 0.5 : 0.01;
          arr[index].isSolo = index === soloIndex ? true : false;
        });
        state.audios = arr;
      }
      //cancel solo
      else {
        arr.map((audio, index) => {
          arr[index].volume = 0.5;
          arr[index].isSolo = false;
        });
        state.audios = arr;
      }
    },
    __setVolume: (state, { payload }) => {
      state.audios[payload.index].isMute =
        payload.volume === 0.01 ? true : false;
      state.audios[payload.index].volume = payload.volume;
    },
    __setCollaboPart: (state, { payload }) => {
      state.collaboRequestData.audios[payload.index].part = payload.part;
      const hasEmpty = state.collaboRequestData.audios
        .map((audio) => audio.part)
        .indexOf("");
      state.collaboRequestData.isValid = hasEmpty === -1 ;
    },
    __cleanUp: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getAudios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getAudios.fulfilled,
        (state, { payload }: { payload: AudioData[] }) => {
          console.log("extra reducer", payload);
          state.isLoading = false;
          payload.map((audio) => {
            state.audios = state.audios.concat({
              ...state.audio,
              isNewAudio: false,
              audioData: audio,
            });
          });
          state.progressControl.src = payload[0].musicFile;
        }
      )
      .addCase(__getAudios.rejected, (state, { payload }) => {
        console.log("__getAudios rejected payload", payload);
        state.error = payload;
      })
      .addCase(__getPostInfo.fulfilled, (state, { payload }) => {
        console.log("extra reducer", payload);
        state.title = payload.title;
        state.isLoading = false;
      })
      .addCase(__getPostInfo.rejected, (state, { payload }) => {
        console.log("__getPostTitle rejected payload", payload);
        state.error = payload;
      })
      .addCase(
        __getCollaboRequested.fulfilled,
        (state, { payload }: { payload: CollaboRequested }) => {
          console.log("__getCollaboRequested fullflled payload", payload);
          state.title = payload.nickname + "님의 콜라보 요청";
          state.collaboDescription = payload.contents;
        }
      )
      .addCase(__getCollaboRequested.rejected, (state, { payload }) => {
        console.log("__getCollaboRequested rejected payload", payload);
        state.error = payload;
      });
  },
});
export const __getAudios = createAsyncThunk(
  "__getAudios",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`/post/${payload}/music`);
      if (data.customHttpStatus === 2000) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getPostInfo = createAsyncThunk(
  "__getPostInfo",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`/post/details/${payload}`);
      if (data.customHttpStatus === 2000) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getCollaboRequested = createAsyncThunk(
  "__getCollaboRequested",
  async (payload: number, thunkAPI) => {
    try {
      const { data }: { data: res } = await instanceAxios.get(
        `/collabo/${payload}`
      );
      if (data.customHttpStatus === 2000) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const config = { headers: { "Content-Type": "multipart/form-data" } };
export const uploadPost = async (data: Form) => {
  return await instanceAxios.post(`/post`, data);
};
export const collaboRequest = async (data: any, postId: string | number) => {
  return await instanceAxios.post(`/post/${postId}/collabo`, data, config);
};
export const collaboApprove = async (collaboId: string | number) => {
  return await instanceAxios.post(`/collabo/${collaboId}`);
};
export const {
  __addNewAudio,
  __togglePlay,
  __seekTo,
  __setMute,
  __setSolo,
  __setVolume,
  __typeTitle,
  __cleanUp,
  __setCollaboPart,
} = postingSlice.actions;
export default postingSlice.reducer;
