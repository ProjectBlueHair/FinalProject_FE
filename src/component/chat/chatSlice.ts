import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
import { Chat, ChatRoom, ChatState } from "../../model/ChatModel";
import { AppState } from "../../redux/config";

export const roomIdSelector = (state: AppState) => state.chat.currentRoomId;
export const chatSelector = (state: AppState) => state.chat.chat;
export const chatRoomsSelector = (state: AppState) => state.chat.chatRooms;
export const currentRoomIdSelector = (state: AppState) =>
  state.chat.currentRoomId;
export const connectionSelector = (state: AppState) =>
  state.chat.connected;

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [] as ChatRoom[],
    chat: [] as Chat[],
    currentRoomId: 0,
    connected: false,
  } as ChatState,
  reducers: {
    __selectChatRoom: (state, { payload }) => {
      console.log("__selectChatRoom payload ... ", payload);
      // state.chat = []
      state.currentRoomId = payload;
    },
    __updateChat: (state, { payload }: { payload: Chat }) => {
      state.chat = state.chat.concat(payload);
      console.log("__sendChat chats ... ", state.chat);
    },
    __clearChat: (state) => {
      state.chat = [];
    },
    __stompConnected: (state, { payload }) => {
      state.connected = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__directMessage.fulfilled, (state, { payload }) => {
        console.log("__directMessage payload ..", payload);
        state.currentRoomId = payload;
      })
      .addCase(__getChatRooms.fulfilled, (state, { payload }) => {
        console.log("__getChatRooms payload ..", payload);
        state.chatRooms = payload;
        state.currentRoomId = payload.length > 0 ? payload[0].roomId : 0;
      })
      .addCase(__getChat.fulfilled, (state, { payload }) => {
        console.log("__getChat payload ..", payload);
        state.chat = payload;
      });
  },
});
export const __directMessage = createAsyncThunk(
  "__directMessage",
  async (payload: string, thunkAPI) => {
    try {
      const { data } = await instanceAxios.post(`/chat/room/${payload}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getChatRooms = createAsyncThunk(
  "__getChatRooms",
  async (_, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get("/chat/rooms");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getChat = createAsyncThunk(
  "__getChat",
  async (payload: string | number, thunkAPI) => {
    try {
      const { data } = await instanceAxios.get(`/chat/room/${payload}`);
      console.log("__getChat thunk ...", data);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const { __selectChatRoom, __clearChat, __updateChat,__stompConnected } =
  chatSlice.actions;
export default chatSlice.reducer;
