import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { App } from "aws-sdk/clients/opsworks";
import { testAudios } from "../../component/main/MockResource";
import { AppState } from "../config";
import {
  ProgressControl,
  Audio,
  Form,
  AudioData,
  CollaboAudio,
} from "../../model/PostingModel";
import { instanceAxios } from "../../dataManager/apiConfig";

export const audiosSelector = (state: AppState) => state.posting.audios;
export const audioControlSelector = (state: AppState) =>
  state.posting.progressControl;
export const titleSelector = (state: AppState) => state.posting.title;
//todo: 대표곡 받는 부분 어떻게 할 것인지 정해야함
export const hasAudioSelector = (state: AppState) => state.posting.hasAudio;
export const collaboAudioSelector = (state: AppState) =>
  state.posting.collaboAudios;

export interface PostingState {
  title: "";
  hasAudio: boolean;
  audios: Audio[];
  progressControl: ProgressControl;
  newAudio: Audio;
  collaboAudios: CollaboAudio[];
}
export const postingSlice = createSlice({
  name: "posting",
  initialState: {
    title: "",
    hasAudio: false,
    // audios: testAudios,
    audios: [] as Audio[],
    progressControl: { isPlaying: false, seekTo: 0, src: undefined },
    newAudio: {
      audioData: {},
      isMute: false,
      isNewAudio: true,
      volume: 0.5,
      isSolo: false,
      part: "",
    },
    collaboAudios: [] as CollaboAudio[],
  } as PostingState,
  reducers: {
    __addNewAudio: (state, { payload }) => {
      state.progressControl.src = state.progressControl.src || payload[0]?.src;
      const arr: Audio[] = [];
      const arr2: CollaboAudio[] = [];
      payload.map((audioData: AudioData) => {
        arr.push({ ...state.newAudio, audioData: audioData });
        // arr2.push({ file: audioData.file, part: "" });
        arr2.push({ src: audioData.src, part: "" });
      });
      state.audios = state.audios.concat(arr);
      state.collaboAudios = state.collaboAudios.concat(arr2);
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
  },
});
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
} = postingSlice.actions;
export default postingSlice.reducer;
