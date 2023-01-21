import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { instanceAxios } from "../../dataManager/apiConfig";

import { AppState, useAppSelector } from "../config";
export const __getGeneralUserInfo = createAsyncThunk(
  "__getGeneralUserInfo",
  async (payload, thunkAPI) => {
    try {

      const { data } = await instanceAxios.get(`/member/info`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export interface User {
  email: string;
  nickname: string;
  profileImg: string;
}
export interface UserState {
  user: User;
  isLoading: boolean;
  error: unknown;
}
export const userSelector = (state: AppState) => state.user.user;
export const userErrorSelector = (state: AppState) => state.user.error;
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { email: "", nickname: "", profileImg: "" } as User,
    isLoading: false,
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getGeneralUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        __getGeneralUserInfo.fulfilled,
        (state, { payload }: { payload: User }) => {
          state.user = { ...payload };
        }
      )

  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
