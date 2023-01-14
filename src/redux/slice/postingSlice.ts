import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../config";

export interface AudioControl {
  isPlaying: boolean;
  seekTo: string;
}
export interface AudioInfo {
  nickname: string;
  part: string;
  src: string;
}
export interface Audio {
  audioInfo: AudioInfo;
  isMute: boolean;
  isNewAudio: boolean;
}
export interface Form {
  contents: string;
  lyrics: string;
  postImg: string;
  title: string;
}
export interface PostingState {
  //   paging: Paging;
  form: Form;
  audios: Audio[];
  audioControl: AudioControl;
}
export interface Paging {
  isNew: boolean;
  isEdit: boolean;
  isCollabo: boolean;
}
export const audiosSelector = (state: AppState) => state.posting.audios;
// export const postingSelector = (state: AppState) => state.posting.paging;

export const postingSlice = createSlice({
  name: "posting",
  initialState: {
    //todo: isNew to false after ui done
    // paging은 posting page 에서 url로만 처리해도 될 것 같다.
    // paging: { isNew: true, isEdit: false, isCollabo: false },
    form: {},
    audios: [] as Audio[],
    audioControl: {},
  } as PostingState,
  reducers: {
    __addNewAudio: (state, { payload }) => {
      state.audios = state.audios.concat({
        audioInfo: payload,
        isMute: false,
        isNewAudio: true,
      });
    },
  },
});

export const {} = postingSlice.actions;
export default postingSlice.reducer;
