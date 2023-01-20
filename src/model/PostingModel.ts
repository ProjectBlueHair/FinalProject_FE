export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
}
export interface Audio {
  audioData: AudioData;
  isMute: boolean;
  isNewAudio: boolean;
  isSolo: boolean;
  volume: number;
}
//what we receive from audio get api
export interface AudioData {
  musicFile: string;
  part: string;
  nickname: string;
}
export interface Form {
  contents: string;
  collaboNotice: string;
  postImg: string | null;
  title: string;
}
export interface CollaboForm {
  contents: string;
  musicPartList: string[];
}
export interface CollaboAudio {
  src: string;
  part: string;
}
export interface CollaboRequested {
  activated: boolean;
  approval: boolean;
  contents: string;
  createdAt: string;
  modifiedAt: string;
  musicList: AudioData[];
  nickname: string;
}
export interface CollaboReqeustedAudioData {
  musicFile: string;
  musicPart: string;
  nickname: string;
}
export interface CollaboRequestData {
  audios: CollaboAudio[];
  isValid: boolean;
}
