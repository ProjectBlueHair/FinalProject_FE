export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
  onLoad : boolean
}
export interface Audio {
  audioData: AudioData;
  isMute: boolean;
  isNewAudio: boolean;
  isCollaboRequested? : boolean
  isSolo: boolean;
  volume: number;
  isLoaded : boolean
}
//what we receive from server
export interface AudioData {
  musicFile: string;
  musicPart: string;
  nickname: string;
}
export interface Form {
  contents: string;
  collaboNotice: string;
  postImg: string;
  title: string;
}
export interface NewPostForm {
  requestCollaboRequestDto : CollaboForm
  requestPostDto : Form
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
export interface CollaboReqeustedForm {
  title: string;
  explain: string;
}
export interface CollaboRequestData {
  audios: CollaboAudio[];
  isValid: boolean;
}
