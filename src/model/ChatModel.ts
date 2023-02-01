export interface ChatItem {
  nickname: string;
  profileImg: string;
  roomId : string | number
}
export interface ChatBubbleModel {
  id : number;
  from: string;
  profileImg: string;
  message: string [];
  time: string;
}
