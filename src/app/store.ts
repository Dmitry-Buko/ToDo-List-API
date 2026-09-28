import { configureStore } from "@reduxjs/toolkit";
import taskReducer, { taskSlice } from "../todo/store/taskSlice";
import inputSlice from "../todo/store/inputSlice";
import { taskApi } from "@/features/todos/taskApi";

const store = configureStore({
  reducer: {
    // text: inputSlice,
    // task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export default store;
export const { selectCurrentFilter } = taskSlice.getSelectors(
  (state) => state.task,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
