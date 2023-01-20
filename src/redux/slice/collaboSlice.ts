import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../../dataManager/apiConfig";
export const __getCollaboList = createAsyncThunk(
  "__getCollaboList",
  async (payload: number, thunkAPI) => {
    try {
      // const { data } = await axios.get(`/post?page=${Number(payload)}`);
      const {data} = await instanceAxios.get(`/post?page=${Number(payload)}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export interface CollaboState {
    collaboId : string | number
    isLoading : boolean
}

export const collaboSlice = createSlice({
  name: "collaboe",
  initialState: {
    collaboId:'',
    isLoading:false
  } as CollaboState,
  reducers: {
    __MainTogglePlay: (state, action) => {
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(__getCollaboList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(__getCollaboList.fulfilled, (state, { payload }) => {
        state.collaboId = payload
      });
  },
});
export const {
} = collaboSlice.actions;
export default collaboSlice.reducer;
