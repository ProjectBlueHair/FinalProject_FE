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
  isAddedAudio: boolean;
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


