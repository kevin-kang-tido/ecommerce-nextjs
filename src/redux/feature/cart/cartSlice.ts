import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/lib/definitions";
import { CartProductType } from "@/lib/definitions";


// Define a type for the slice state
// type initailState = {
// 	products:[] as ProductType[],
// };

const initialState = {
    products:[] as ProductType[],
    totalPrice: 0 ,
};


 const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<ProductType>) => {
        state.products.push(action.payload);
        state.totalPrice += action.payload.price;
      },
      removeFromCart: (state, action: PayloadAction<number>) => {
              // find product by id(remove product by id )
              const product = state.products.find((product) => product.id === action.payload);
  
              state.totalPrice -= product?.price || 0;
  
            state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      },
    },
  
  })
  
 // export  action to use
 export const {addToCart, removeFromCart} = cartSlice.actions;
  
  export default cartSlice.reducer

  // create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
