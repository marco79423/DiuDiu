import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

// Slice
export const entityAdapter = createEntityAdapter()
const objectSlice = createSlice({
  name: 'object',
  initialState: entityAdapter.getInitialState(),
  reducers: {
    addOne: entityAdapter.addOne,
    updateOne: entityAdapter.updateOne,
    removeAll: entityAdapter.removeAll,
  }
})

// Reducer
export default objectSlice
