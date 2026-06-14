import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/todoApi";

const initialState = {
  taskValue: [],
  error: "",
  loading: false,
  filter: "all",
};

export const addTodos = createAsyncThunk(
  "todo/addTodos",
  async (newTodo, thunkAPI) => {
    try {
      const response = await api.post("/todos", {
        title: newTodo,
        description: null,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message[0] || "Произошла ошибка",
      );
    }
  },
);

export const deleteTodos = createAsyncThunk(
  "todo/deleteTodos",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const editTodos = createAsyncThunk(
  "todo/editTodos",
  async (inputData, thunkAPI) => {
    const { id, newTitle } = inputData;
    // console.log('inputData', newTitle);
    try {
      const response = await api.patch(`/todos/${id}`, {
        title: newTitle,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const togglerTodos = createAsyncThunk(
  "todo/togglerTodos",
  async (id, thunkAPI) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const clearCompetedTodos = createAsyncThunk(
  "todo/clearCompetedTodos",
  async (_, thunkAPI) => {
    const completedTask = initialState.taskValue.filter(
      (item) => item.completed,
    );
    if (completedTask.length === 0) return;
    try {
      const deletePromise = completedTask.map((taks) => {
        api.delete(`/todos/${taks.id}`);
      });
      await Promise.all(deletePromise);
      console.log("111:", deletePromise.data);
      return deletePromise.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const handlePending = (state) => {
  state.loading = true;
  state.error = "";
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "Произошла ошибка";
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodos.fulfilled, (state, action) => {
        state.taskValue.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodos.pending, handlePending)
      .addCase(addTodos.rejected, handleRejected)
      //---------------------------------------------
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.taskValue = state.taskValue.filter(
          (task) => task.id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(deleteTodos.pending, handlePending)
      .addCase(deleteTodos.rejected, handleRejected)
      //---------------------------------------------
      .addCase(editTodos.fulfilled, (state, action) => {
        state.taskValue = state.taskValue.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        );
        state.loading = false;
      })
      .addCase(editTodos.pending, handlePending)
      .addCase(editTodos.rejected, handleRejected)
      //---------------------------------------------
      .addCase(togglerTodos.fulfilled, (state, action) => {
        state.taskValue = state.taskValue.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: action.payload.completed }
            : task,
        );
      })
      //---------------------------------------------
      .addCase(clearCompetedTodos.pending, handlePending)
      .addCase(clearCompetedTodos.fulfilled, (state) => {
        state.taskValue = state.taskValue.filter((task) => !task.completed);
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;
