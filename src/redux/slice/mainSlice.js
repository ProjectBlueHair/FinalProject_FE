import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import client from "../../dataManager/apiConfig";
export const __getPostList = createAsyncThunk(
    "__getPostList",
    async (payload, thunkAPI) => {
      try {
        console.log("payload", payload);
        const res = await axios.get("/api/post", payload);
        
        return res.data
      } catch (error) { 
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
const initialState = {
    posts : [],
    currentMusic : {

    }, 
    isLoading: false,
    error: null,
}

export const mainSlice = createSlice({
    name:'main', 
    initialState, 
    reducers:{

    }, 
    extraReducers:{
        
    }

})