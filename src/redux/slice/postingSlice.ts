import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
import {
  Audio,
  AudioData,
  CollaboAudio,
  CollaboReqeustedForm,
  CollaboRequestData,
  CollaboRequested,
  Form,
  NewAudio,
  ProgressControl,
} from "../../model/PostingModel";
import { Response } from "../../model/ResponseModel";
import { AppState } from "../config";

export const formSelector = {
  title: (state: AppState) => state.posting.form.title,
  postImg: (state: AppState) => state.posting.form.postImg,
  collaboNotice: (state: AppState) => state.posting.form.collaboNotice,
  contents: (state: AppState) => state.posting.form.contents,
  form: (state: AppState) => state.posting.form,
};
export const audioControlSelector = (state: AppState) =>
  state.posting.progressControl;
export const totalPlayHandleSelector = (state: AppState) =>
  state.posting.progressControl.totalPlayHandle;
export const audiosSelector = (state: AppState) => state.posting.audios;
export const postingErrorSelector = (state: AppState) => state.posting.error;
export const collaboRequestDataSelector = (state: AppState) =>
  state.posting.collaboRequestData;
export const CollaboRequestedFormSelector = (state: AppState) =>
  state.posting.collaboRequestedForm;
export const loadingSelector = (state: AppState) => state.posting.isLoading;
export interface PostingState {
  form: Form; // postingForm component
  collaboRequestedForm: CollaboReqeustedForm; // 콜라보 승인 컴포넌트
  progressControl: ProgressControl; // total play 컴포넌트
  audios: Audio[]; // audio bars 컴포넌트
  audio: Audio; // form audio 컴포넌트
  collaboRequestData: CollaboRequestData; // form collabo 컴포넌트
  isLoading: boolean; // 공통
  error: any; // 공통
}

const initialState = {
  form: { contents: "", collaboNotice: "", postImg: "", title: "" },
  audios: [] as Audio[],
  collaboRequestedForm: { title: "", explain: "" },
  collaboRequestData: { isValid: false, audios: [] as CollaboAudio[] },
  progressControl: {
    isPlaying: false,
    seekTo: 0,
    src: undefined,
    onLoad: false,
    totalPlayHandle: { play: false, seekTo: 0 },
  },
  audio: {
    audioData: { musicFile: "" } as AudioData,
    isMute: false,
    isNewAudio: false,
    volume: 0.5,
    isCollaboRequested: false,
    isSolo: false,
    isLoaded: false,
    duration: 0,
  } as Audio,
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
    __addNewAudio: (state, { payload }) => {
      console.log("__addNewAudio");
      payload.forEach((musicFile: NewAudio) => {
        state.audios.push({
          ...state.audio,
          isNewAudio: true,
          duration: musicFile.duration,
          audioData: { ...state.audio.audioData, musicFile: musicFile.url },
        });
        state.collaboRequestData.audios.push({ src: musicFile.url, part: "" });
      });
      const audiosCopy = [...state.audios];
      audiosCopy.sort((a, b) => {
        return b.duration - a.duration;
      });
      state.progressControl = {
        ...state.progressControl,
        src: audiosCopy[0].audioData.musicFile,
        seekTo: 0,
        onLoad: false,
        isPlaying: false,
      };
      state.progressControl.totalPlayHandle = { play: false, seekTo: 0 };
    },
    __removeAudio: (state, { payload }) => {
      const originalAudiosLength =
        state.audios.length - state.collaboRequestData.audios.length;
      state.audios.splice(payload, 1);
      state.collaboRequestData.audios.splice(payload - originalAudiosLength, 1);
      state.progressControl.src =
        state.audios.length > 0
          ? state.audios[0].audioData.musicFile
          : undefined;
    },
    __audioOnLoaded: (state, { payload }) => {
      state.audios[payload].isLoaded = true;
      const fullyLoaded = state.audios
        .map((audio) => audio.isLoaded)
        .indexOf(false);
      state.progressControl.onLoad = fullyLoaded === -1;
    },
    __setCollaboPart: (state, { payload }) => {
      state.audios[payload.index].audioData.musicPart = payload.part;
      const originalAudiosLength =
        state.audios.length - state.collaboRequestData.audios.length;
      state.collaboRequestData.audios[
        payload.index - originalAudiosLength
      ].part = payload.part;

      const hasEmpty = state.collaboRequestData.audios
        .map((audio) => audio.part.trim())
        .indexOf("");
      state.collaboRequestData.isValid = hasEmpty === -1;
    },
    __togglePlay: (state, { payload }) => {
      state.progressControl.isPlaying = payload;
    },
    __seekTo: (state, { payload }) => {
      state.progressControl.seekTo = payload;
    },
    __endPlay: (state) => {
      state.progressControl = {
        ...state.progressControl,
        isPlaying: false,
        seekTo: 0,
      };
    },
    __setMute: (state, { payload }) => {
      state.audios[payload].volume = state.audios[payload].isMute
        ? 0.5
        : 0.00001;
      state.audios[payload].isMute = !state.audios[payload].isMute;
    },
    __setSolo: (state, { payload }) => {
      const soloIndex = payload;
      //start solo
      if (!state.audios[payload].isSolo) {
        state.audios.forEach((audio, index) => {
          state.audios[index].volume = index === soloIndex ? 0.5 : 0.00001;
          state.audios[index].isSolo = index === soloIndex ? true : false;
        });
      }
      //cancel solo
      else {
        state.audios.forEach((audio, index) => {
          state.audios[index].volume = 0.5;
          state.audios[index].isSolo = false;
        });
      }
    },
    __setVolume: (state, { payload }) => {
      state.audios[payload.index].isMute =
        payload.volume === 0.00001 ? true : false;
      state.audios[payload.index].volume = payload.volume;
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
      .addCase(__getAudios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getAudios.fulfilled,
        (state, { payload }: { payload: AudioData[] }) => {
          state.isLoading = false;
          payload.forEach((audio) => {
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
        state.error = payload;
      })

      .addCase(__getCollaboRequested.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getCollaboRequested.fulfilled,
        (state, { payload }: { payload: CollaboRequested }) => {
          state.collaboRequestedForm = {
            ...state.collaboRequestedForm,
            title: payload.nickname + "님의 콜라보 요청 메세지",
            explain: payload.contents,
          };
          state.progressControl.src =
            state.progressControl.src || payload.musicList[0]?.musicFile;
          payload.musicList.forEach((audio: AudioData) => {
            state.audios = state.audios.concat({
              ...state.audio,
              isCollaboRequested: true,
              isNewAudio: true,
              audioData: audio,
            });
          });
        }
      )
      .addCase(__getCollaboRequested.rejected, (state, { payload }) => {
        console.log("__getCollaboRequested", payload);

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
      console.log("postinfo(detail)", data);

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
export const uploadNewPost = async (data: FormData) => {
  return await instanceAxios.post(`/post/new`, data);
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
  __cleanUp,
  __setCollaboPart,
  __audioOnLoaded,
  __form,
  __endPlay,
  __removeAudio,
} = postingSlice.actions;
export default postingSlice.reducer;
