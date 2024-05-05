import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './feature/counter/counterSlice'
import cartSlice from "@/redux/feature/cart/cartSlice";
import userProfileSlice from "@/redux/feature/userProfile/userProfileSlice";
import tokenSlice from "@/redux/feature/token/tokenSlice";
import {ecommerceApi} from "@/redux/service/ecommerce";
import productSlice from "@/redux/feature/product/productSlice";
// import cartSlice from './feature/cart/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
      accessToken:tokenSlice,
      counter: counterSlice,
      cart:cartSlice,
      userProfile:userProfileSlice,
      product: productSlice
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ecommerceApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']