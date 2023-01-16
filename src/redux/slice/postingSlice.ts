import { createSlice } from "@reduxjs/toolkit";
import { App } from "aws-sdk/clients/opsworks";
import { testAudios } from "../../component/main/MockResource";
import { AppState } from "../config";

export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
}
export interface AudioInfo {
  nickname: string;
  part: string;
  src: string;
  file : File
}
export interface Audio {
  audioInfo: AudioInfo;
  isMute: boolean;
  isNewAudio: boolean;
  isSolo: boolean;
  volume: number;
}

export interface Form {
  contents: string;
  postImg: string
  title: string;
}
export interface CollaboRequest { 
  contents : string, 
  musicPartList : string [],
  audios : File[]
}
export interface PostingState {
  //   paging: Paging;
  form: Form;
  audios: Audio[];
  progressControl: ProgressControl;
}
export interface Paging {
  isNew: boolean;
  isEdit: boolean;
  isCollabo: boolean;
}
export const audiosSelector = (state: AppState) => state.posting.audios;
export const audioControl = (state: AppState) => state.posting.progressControl;

export const postingSlice = createSlice({
  name: "posting",
  initialState: {
    form: {},
    audios: testAudios,
    progressControl: {},
  } as PostingState,
  reducers: {
    __addNewAudio: (state, { payload }) => {
      state.audios = state.audios.concat({
        audioInfo: payload,
        isMute: false,
        isNewAudio: true,
        volume: 0.5,
        isSolo: false,
      });
    },
    __togglePlay: (state, { payload }) => {
      console.log("toggle play", payload);

      state.progressControl.isPlaying = payload;
    },
    __seekTo: (state, { payload }) => {
      console.log("seek to", payload);
      state.progressControl.seekTo = payload;
    },
    __setMute: (state, { payload }) => {
      state.audios[payload].volume = state.audios[payload].isMute ? 0.5 : 0.01;
      state.audios[payload].isMute = !state.audios[payload].isMute;
    },
    __setSolo: (state, { payload }) => {
      console.log("setSolo to", payload);
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
  },
});

export const {
  __addNewAudio,
  __togglePlay,
  __seekTo,
  __setMute,
  __setSolo,
  __setVolume,
} = postingSlice.actions;
export default postingSlice.reducer;
