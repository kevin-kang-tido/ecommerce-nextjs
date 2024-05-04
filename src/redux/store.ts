import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './feature/counter/counterSlice'
import cartSlice from "@/redux/feature/cart/cartSlice";
import userProfileSlice from "@/redux/feature/userProfile/userProfileSlice";
// import cartSlice from './feature/cart/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      cart:cartSlice,
      userProfile:userProfileSlice

    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']