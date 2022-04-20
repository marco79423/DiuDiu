import {combineReducers, configureStore} from '@reduxjs/toolkit'

import appSlice from '../slices/app'
import objectSlice from '../slices/object'

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    object: objectSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),],
})

export default store
