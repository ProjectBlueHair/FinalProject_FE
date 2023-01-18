export interface ProgressControl {
  isPlaying: boolean;
  seekTo: number;
  src: string | undefined;
}
export interface AudioData {
  src: string;
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
