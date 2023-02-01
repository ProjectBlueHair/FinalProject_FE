export interface ChatRoom {
  nickname: string;
  profileImg: string;
  roomId: string | number;
  finalMessage: string;
}
export interface Chat {
  id: number;
  nickname: string;
  profileImg: string;
  message: string[];
  date: string;
  time: string;
}
