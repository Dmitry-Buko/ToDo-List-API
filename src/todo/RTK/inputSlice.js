import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
  inputError: "",
}

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    addInputValue: (state, action)=>{
      state.inputValue = action.payload
    },
    setInputError: (state, action)=>{
      state.inputError = action.payload
    },
  },
  extraReducers: ()=>{}
})

export default inputSlice.reducer
export const {addInputValue, setInputError} = inputSlice.actions