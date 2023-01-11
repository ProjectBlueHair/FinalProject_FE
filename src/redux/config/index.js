
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "../slice/modalSlice";
import main from '../slice/mainSlice'

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  main
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
