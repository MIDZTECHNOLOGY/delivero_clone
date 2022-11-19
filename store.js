import { configureStore } from '@reduxjs/toolkit'
import basketReducer from "./Features/basketSlice"
import restaurantReducer from './Features/restaurantSlice'

export const store = configureStore({
  reducer: {
    basket : basketReducer,
    restaurant: restaurantReducer,
  },
})