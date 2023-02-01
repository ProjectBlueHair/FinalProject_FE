export interface ChatRoom {
  nickname: string;
  profileImg: string;
  roomId: string | number;
  finalMessage: string;
}
export interface Chat {
  nickname: string;
  profileImg: string;
  message: string;
  date?: string;
  time?: string;
}
export interface ChatState {
  chatRooms : ChatRoom[]
  chat : Chat []
  currentRoomId : string | number
}