import { createSlice } from '@reduxjs/toolkit'

export const productaction = createSlice({
  name: "Product",
  initialState: {
    value: [],
    addedproductlist: [],
  },
  reducers: {
    addcat: (state, action) => {
        state.value.push(action.payload)      
    },
    addproduct: (state,action) => {
        state.addedproductlist.push(action.payload)  
    },
  },
})

export const { addcat, addproduct } = productaction.actions

export default productaction.reducer
