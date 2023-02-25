export interface H5player {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
  ready: boolean;
  init: boolean;
}
export interface Wavesurfer {
  // audio control model
  audioInfo: AudioInfo;
  isMute: boolean;
  isNewAudio: boolean;
  isCollaboRequested?: boolean;
  isSolo: boolean;
  volume: number;
  isLoaded: boolean;
  duration: number;
}
export interface AudioInfo {
  //__getAudios response DTO model
  musicFile: string;
  musicPart: string;
  nickname: string;
}

export interface PostingFormData {
  contents: string;
  collaboNotice: string;
  postImg: string;
  title: string;
}
export interface NewPostDto {
  collaboFormData: collaboFormData;
  postingFormData: PostingFormData;
}
export interface collaboFormData {
  contents: string;
  musicPartList: string[];
}
export interface CollaboRequestedDto {
  activated: boolean;
  approval: boolean;
  contents: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  musicList: AudioInfo[];

}

export interface CollaboAudio {
  src: string;
  part: string;
}
export interface CollaboRequestData {
  audios: CollaboAudio[];
  isValid: boolean;
}
