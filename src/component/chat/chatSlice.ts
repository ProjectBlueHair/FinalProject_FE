import { createSlice } from "@reduxjs/toolkit";
import { ChatItem } from "../../model/ChatModel";
import { AppState } from "../../redux/config";


export const roomIdSelector = (state:AppState) => state.chat.roomId

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    roomId: "",
  } as ChatItem,
  reducers: {
    __selectChatRoom: (state, { payload }) => {
      state.roomId = payload;
    },
  },
});

export const { __selectChatRoom } = chatSlice.actions;
export default chatSlice.reducer;
