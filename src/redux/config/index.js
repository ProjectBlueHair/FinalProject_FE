
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "../slice/modalSlice";

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  main
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
