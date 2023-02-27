export interface H5player {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
  ready: boolean;
  init: boolean;
}
export interface Wavesurfer {
  // audio control model
  audioSrcInfo: AudioDto;
  isMute: boolean;
  isNewAudio: boolean;
  isCollaboRequested?: boolean;
  isSolo: boolean;
  volume: number;
  isLoaded: boolean;
  duration: number;
}
export interface AudioDto {
  musicFile: string;
  musicPart: string;
  nickname: string;
}
export interface AddedAudio {
  src: string;
  part: string;
}
export interface AddedAudiosState {
  addedAudios: AddedAudio[];
  partsAllValid: boolean;
}

export interface PostingFormDto {
  contents: string;
  collaboNotice: string;
  postImg: string;
  title: string;
}
export interface DtoForPostingNew {
  newAudiosDto: CollaboForm;
  postingFormData: PostingFormDto;
}
export interface CollaboForm {
  contents: string;
  audioPartList: string[];
}



export interface CollaboRequestedDto {
  activated: boolean;
  approval: boolean;
  contents: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  musicList: AudioDto[];
}
