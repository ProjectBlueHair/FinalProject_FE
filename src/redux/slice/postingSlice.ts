import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
import { Response } from "../../model/ResponseModel";

export const audiosSelector = (state: AppState) => state.posting.audios;
export const audioControlSelector = (state: AppState) =>
  state.posting.progressControl;
export const titleSelector = (state: AppState) => state.posting.title;
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
  collaboRequestData: CollaboRequestData;
  isLoading: boolean;
  error: unknown;
}
const initialState = {
  title: "",
  collaboDescription: "",
  audios: [] as Audio[],
  progressControl: {
    isPlaying: false,
    seekTo: 0,
    src: undefined,
    onLoad: false,
  },
  audio: {
    audioData: {} as AudioData,
    isMute: false,
    isNewAudio: false,
    volume: 0.5,
    isCollabo: false,
    isSolo: false,
    isLoaded: false,
  } as Audio,
  collaboRequestData: { isValid: false, audios: [] as CollaboAudio[] },
  isLoading: false,
  error: null,
} as PostingState;
export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    __typeTitle: (state, { payload }) => {
      state.title = payload;
    },
    

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
    __audioOnLoaded: (state, { payload }) => {
      state.audios[payload].isLoaded = true;
      const fullyLoaded = state.audios
        .map((audio) => audio.isLoaded)
        .indexOf(false);
      state.progressControl.onLoad = fullyLoaded === -1;
    },
    __setCollaboPart: (state, { payload }) => {
      const originalAudiosLength =
        state.audios.length - state.collaboRequestData.audios.length;
      state.collaboRequestData.audios[
        payload.index - originalAudiosLength
      ].part = payload.part;

      const hasEmpty = state.collaboRequestData.audios
        .map((audio) => audio.part)
        .indexOf("");
      state.collaboRequestData.isValid = hasEmpty === -1;
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
    __cleanUp: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPostInfo.rejected, (state, { payload }) => {
        console.log("__getPostTitle rejected payload", payload);
        state.error = payload;
      })
      .addCase(__getPostInfo.fulfilled, (state, { payload }) => {
        state.title = payload.title;
        state.isLoading = false;
      })
      .addCase(__getAudios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getAudios.fulfilled,
        (state, { payload }: { payload: AudioData[] }) => {
          console.log("__getAudios payload", payload);
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

      .addCase(__getCollaboRequested.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getCollaboRequested.fulfilled,
        (state, { payload }: { payload: CollaboRequested }) => {
          console.log("__getCollaboRequested payload", payload);
          state.title = payload.nickname + "님의 콜라보 요청";
          state.collaboDescription = payload.contents;
          console.log("payload.musicList[0]", payload.musicList[0]);
          state.progressControl.src =
            state.progressControl.src || payload.musicList[0]?.musicFile;

          payload.musicList.map((audio: AudioData) => {
            state.audios = state.audios.concat({
              ...state.audio,
              isCollabo: true,
              isNewAudio: true,
              audioData: audio,
            });
          });
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
      return data.data;
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
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getCollaboRequested = createAsyncThunk(
  "__getCollaboRequested",
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

const config = { headers: { "Content-Type": "multipart/form-data" } };
export const uploadPost = async (data: Form) => {
  return await instanceAxios.post(`/post`, data);
};
export const collaboRequest = async (data: any, postId: string | number) => {
  return await instanceAxios.post(`/post/${postId}/collabo`, data, config);
};
// export const collaboRequestFirst = async (data: any, postId: string | number) => {
//   return await instanceAxios.post(`/post/${postId}/collabo/first`, data, config);
// };
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
  __audioOnLoaded
} = postingSlice.actions;
export default postingSlice.reducer;
