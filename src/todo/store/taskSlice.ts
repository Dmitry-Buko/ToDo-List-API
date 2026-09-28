import { Filter } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TaskSliceState {
  filter: Filter;
}

const initialState: TaskSliceState = {
  filter: "all",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
  selectors: {
    selectCurrentFilter: (state) => state.filter,
  },
});

export default taskSlice.reducer;
export const { setFilter } = taskSlice.actions;
