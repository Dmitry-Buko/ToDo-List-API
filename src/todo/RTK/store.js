import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taksSlice";
import inputSlice from "./inputSlice";

const store = configureStore({
  reducer: {
    text: inputSlice,
    task: taskSlice,
  },
});

export default store;
