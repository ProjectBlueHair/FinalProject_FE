import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import detail from "../slice/detailSlice";

import { modalSlice } from "../slice/modalSlice";
import main from "../slice/mainSlice";
import posting from "../slice/postingSlice";
import { typeModalSlice } from "../../modal/typeModalSlice";
const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  posting,
  main,
  detail,
  typeModal: typeModalSlice.reducer,
});
export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
