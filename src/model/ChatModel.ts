export interface ChatItem {
  nickname: string;
  profileImg: string;
}
export interface ChatBubbleModel {
  id : number;
  from: string;
  profileImg: string;
  message: string [];
  time: string;
}
