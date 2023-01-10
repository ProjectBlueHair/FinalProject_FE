import { configureStore } from "@reduxjs/toolkit";
import main from '../slice/mainSlice'

const store = configureStore({
  reducer: {
    main
  },
});

export default store;
