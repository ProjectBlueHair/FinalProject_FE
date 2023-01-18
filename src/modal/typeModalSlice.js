import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const typeModalSelector = (state) => state.typeModal;

export const typeModalSlice = createSlice({
  name: "typeModal",
  initialState,
  reducers: {
    __openModal: (state, action) => {
      console.log("action.payload", action.payload);
      const { type, props } = action.payload;
      return state.concat({ type, props });
    },
    __closeModal: (state, action) => {
      state.pop();
    },
  },
});
export const { __openModal, __closeModal } = typeModalSlice.actions;

export default typeModalSlice.reducer;
