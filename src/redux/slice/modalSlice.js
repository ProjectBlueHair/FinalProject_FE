import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const modalSelector = (state) => state.modal;
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // openModal 액션이 발생하면 모달 리스트에 새로 열린 모달 정보 나타남
    openModal: (state, action) => {
      const { type, props } = action.payload;
      return state.concat({ type, props });
    },
    // closeModal 액션이 발생하면 모달 리스트에서 가장 마지막에 열린 정보를 pop해줌
    closeModal: (state, action) => {
      state.pop();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
