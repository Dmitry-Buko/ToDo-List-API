import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
  errorSpace: "",
}

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {},
  extraReducers: ()=>{}
})

export default inputSlice.reducer