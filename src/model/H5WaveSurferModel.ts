export interface H5player {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
  ready: boolean;
  init: boolean;
}
export interface Wavesurfer {
  // audio control model
  audioSrcInfo: AudioResponseDto;
  isMute: boolean;
  isNewAudio: boolean;
  isCollaboRequested?: boolean;
  isSolo: boolean;
  volume: number;
  isLoaded: boolean;
  duration: number;
}
export interface AudioResponseDto {
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
