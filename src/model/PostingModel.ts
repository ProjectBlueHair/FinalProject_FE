export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
  onLoad: boolean;
  totalPlayHandle: { play: boolean; seekTo: number };
}
export interface Audio {
  // audio control model
  audioData: AudioData;
  isMute: boolean;
  isNewAudio: boolean;
  isCollaboRequested?: boolean;
  isSolo: boolean;
  volume: number;
  isLoaded: boolean;
  duration: number;
}
export interface AudioData {
  //__getAudios response DTO model
  musicFile: string;
  musicPart: string;
  nickname: string;
}
export interface NewAudio {
  url: string;
  duration: number;
}
export interface Form {
  contents: string;
  collaboNotice: string;
  postImg: string;
  title: string;
}
export interface NewPostForm {
  requestCollaboRequestDto: CollaboForm;
  requestPostDto: Form;
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
