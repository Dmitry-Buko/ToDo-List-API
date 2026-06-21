import { configureStore } from "@reduxjs/toolkit";
import taskReducer, { taskSlice } from "../todo/store/taskSlice"; 
import inputSlice from "../todo/store/inputSlice";

const store = configureStore({
  reducer: {
    text: inputSlice,
    task: taskReducer,
  },
});

export default store;
export const { selectCurrentFilter, selectTodos, selectFilteredTodos } = taskSlice.getSelectors(
  (state) => state.task
);
