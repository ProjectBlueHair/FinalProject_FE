export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
}
export interface AudioData {
  // nickname: string;
  // part: string;
  src: string;
  file: File;
}
export interface Audio {
  audioData: AudioData;
  isMute: boolean;
  isNewAudio: boolean;
  isSolo: boolean;
  volume: number;
  part: string;
}

export interface Form {
  contents: string;
  postImg: string;
  title: string;
}
// export interface CollaboForm {
//   // musicPartList: string[];
//   // audios: File[];
//   audios: CollaboFormAudio[];
// }
export interface CollaboAudio {
  file: File;
  part: string;
}
