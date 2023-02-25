import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
import {
  AudioInfo,
  CollaboAudio,
  CollaboRequestData,
  CollaboRequestedDto, H5player, PostingFormData, Wavesurfer
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
export const h5PlayerSelector = (state: AppState) => state.posting.H5player;
export const wavesurferSelector = (state: AppState) =>
  state.posting.wavesurfers;
export const collaboRequestDataSelector = (state: AppState) =>
  state.posting.collaboRequestData;

export const CollaboRequestedFormSelector = (state: AppState) =>
  state.posting.collaboRequestedForm;

export const loadingSelector = (state: AppState) => state.posting.isLoading;
export const postingErrorSelector = (state: AppState) => state.posting.error;

export interface PostingState {
  form: PostingFormData;
  collaboRequestedForm: { title: string; explain: string };

  H5player: H5player;
  wavesurfers: Wavesurfer[];
  wavesurfer: Wavesurfer;
  collaboRequestData: CollaboRequestData;

  isLoading: boolean;
  error: any;
}

const initialState = {
  form: { contents: "", collaboNotice: "", postImg: "", title: "" },
  collaboRequestedForm: { title: "", explain: "" },

  collaboRequestData: { isValid: false, audios: [] as CollaboAudio[] },
  wavesurfers: [] as Wavesurfer[],
  H5player: {
    isPlaying: false,
    seekTo: 0,
    src: undefined,
    ready: false,
    init: false,
  },
  wavesurfer: {
    audioInfo: { musicFile: "" } as AudioInfo,
    isMute: false,
    isNewAudio: false,
    volume: 0.5,
    isCollaboRequested: false,
    isSolo: false,
    isLoaded: false,
    duration: 0,
  } as Wavesurfer,

  isLoading: false,
  error: null,
} as PostingState;
const isMusicPartValid = (audios: CollaboAudio[]) => {
  const hasEmpty = audios.map((audio) => audio.part.trim()).indexOf("");
  return hasEmpty === -1 && audios.length > 0;
};
export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    __form: (state, { payload }) => {
      state.form = { ...state.form, ...payload };
    },

    __addNewAudio: (
      state,
      { payload }: { payload: { url: string; duration: number }[] }
    ) => {
      console.log("__addNewAudio");
      payload.forEach((musicFile) => {
        state.wavesurfers.push({
          ...state.wavesurfer,
          isNewAudio: true,
          duration: musicFile.duration,
          audioInfo: {
            ...state.wavesurfer.audioInfo,
            musicFile: musicFile.url,
          },
        });
        state.collaboRequestData.audios.push({ src: musicFile.url, part: "" });
      });
      state.collaboRequestData.isValid = isMusicPartValid(
        state.collaboRequestData.audios
      );
      const audiosCopy = [...state.wavesurfers];
      audiosCopy.sort((a, b) => {
        return b.duration - a.duration;
      });
      state.H5player = {
        ...state.H5player,
        src: audiosCopy[0].audioInfo.musicFile,
        seekTo: 0,
        ready: false,
        isPlaying: false,
        init: !state.H5player.init,
      };
      // state.progressControl.totalPlayHandle = { play: false, seekTo: 0 };
    },
    __removeAudio: (state, { payload }) => {
      const originalAudiosLength =
        state.wavesurfers.length - state.collaboRequestData.audios.length;
      state.wavesurfers.splice(payload, 1);
      state.collaboRequestData.audios.splice(payload - originalAudiosLength, 1);
      state.collaboRequestData.isValid = isMusicPartValid(
        state.collaboRequestData.audios
      );
      state.H5player.src =
        state.wavesurfers.length > 0
          ? state.wavesurfers[0].audioInfo.musicFile
          : undefined;
    },
    __audioOnLoaded: (state, { payload }) => {
      state.wavesurfers[payload].isLoaded = true;
      const fullyLoaded = state.wavesurfers
        .map((audio) => audio.isLoaded)
        .indexOf(false);
      state.H5player.ready = fullyLoaded === -1;
    },
    __setPartForCollaboAudio: (state, { payload }) => {
      state.wavesurfers[payload.index].audioInfo.musicPart = payload.part;
      const originalAudiosLength =
        state.wavesurfers.length - state.collaboRequestData.audios.length;
      state.collaboRequestData.audios[
        payload.index - originalAudiosLength
      ].part = payload.part;
      state.collaboRequestData.isValid = isMusicPartValid(
        state.collaboRequestData.audios
      );
    },
    __togglePlay: (state, { payload }) => {
      state.H5player.isPlaying = payload;
    },
    __seekTo: (state, { payload }) => {
      state.H5player.seekTo = payload;
    },
    __endPlay: (state) => {
      state.H5player = {
        ...state.H5player,
        isPlaying: false,
        seekTo: 0,
      };
    },
    __setMute: (state, { payload }) => {
      state.wavesurfers[payload].volume = state.wavesurfers[payload].isMute
        ? 0.5
        : 0.00001;
      state.wavesurfers[payload].isMute = !state.wavesurfers[payload].isMute;
    },
    __setSolo: (state, { payload }) => {
      const soloIndex = payload;
      //start solo
      if (!state.wavesurfers[payload].isSolo) {
        state.wavesurfers.forEach((audio, index) => {
          state.wavesurfers[index].volume = index === soloIndex ? 0.5 : 0.00001;
          state.wavesurfers[index].isSolo = index === soloIndex ? true : false;
        });
      }
      //cancel solo
      else {
        state.wavesurfers.forEach((audio, index) => {
          state.wavesurfers[index].volume = 0.5;
          state.wavesurfers[index].isSolo = false;
        });
      }
    },
    __setVolume: (state, { payload }) => {
      state.wavesurfers[payload.index].isMute =
        payload.volume === 0.00001 ? true : false;
      state.wavesurfers[payload.index].volume = payload.volume;
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
        (state, { payload }: { payload: AudioInfo[] }) => {
          state.isLoading = false;
          payload.forEach((audio) => {
            state.wavesurfers = state.wavesurfers.concat({
              ...state.wavesurfer,
              isNewAudio: false,
              audioInfo: audio,
            });
          });
          state.H5player.src = payload[0].musicFile;
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
        (state, { payload }: { payload: CollaboRequestedDto }) => {
          state.collaboRequestedForm = {
            ...state.collaboRequestedForm,
            title: payload.nickname + "님의 콜라보 요청 메세지",
            explain: payload.contents,
          };
          state.H5player.src =
            state.H5player.src || payload.musicList[0]?.musicFile;
          payload.musicList.forEach((audio: AudioInfo) => {
            state.wavesurfers = state.wavesurfers.concat({
              ...state.wavesurfer,
              isCollaboRequested: true,
              isNewAudio: true,
              audioInfo: audio,
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
  __addNewAudio,
  __togglePlay,
  __seekTo,
  __setMute,
  __setSolo,
  __setVolume,
  __cleanUp,
  __setPartForCollaboAudio,
  __audioOnLoaded,
  __form,
  __endPlay,
  __removeAudio,
} = postingSlice.actions;
export default postingSlice.reducer;
