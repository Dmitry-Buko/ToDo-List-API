import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../todo/store/taskSlice";
import { taskApi } from "@/features/todos/taskApi";

const store = configureStore({
  reducer: {
    [taskSlice.name]: taskSlice.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export default store;
export const { selectCurrentFilter } = taskSlice.selectors;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;