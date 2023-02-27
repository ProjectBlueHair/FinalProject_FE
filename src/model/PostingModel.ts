export interface AudioDto {
  musicFile: string;
  musicPart: string;
  nickname: string;
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

export interface CollaboRequestedInfo {
  activated: boolean;
  approval: boolean;
  contents: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  // musicList: AudioDto[]; //todo: 백엔드에서 같이 보내주는 중.. 나중에 바꿀 수 있으면 Api 분리할것
}
