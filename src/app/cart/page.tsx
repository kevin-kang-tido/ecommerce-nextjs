'use client'
import React from 'react'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {removeFromCart, selectProducts, selectTotalPrice} from "@/redux/feature/cart/cartSlice";
import CartComponent from "@/components/card/CartComponent";
import {Button} from "@nextui-org/react";
import SelectCountryComponent from "@/components/autocomplete/SelectCountryComponent";

export default function Cart() {
    const products = useAppSelector(selectProducts);
    const totalPrice = useAppSelector(selectTotalPrice);
    const dispatch = useAppDispatch();
    console.log("Get Products From Click: ",products);
    console.log("the total price : ",totalPrice);

  return (
      <main className='mb-12'>
          <h1 className='text-4xl font-extrabold mt-[90px] mx-[260px] py-12' >Shopping Cart</h1>

          <div className=' mx-[260px] flex justify-between'>
              <div>
                  {
                          products.length == 0 &&
                      <h1 className='text-3xl font-bold'>No Data in Cart!!!</h1>
                  }:
                  {
                      products.length !== 0 && products.map(product =>
                          <div className='mb-4' key={product.id}>
                              <CartComponent
                                  id={product.id}
                                  category={product.category}
                                  name={product.name}
                                  price={product.price}
                                  image={product.image}/>

                              <div className='m-4'>
                                  <Button onClick={() => dispatch(removeFromCart(product.id))}
                                          className='bg-[#db2777] text-white rounded font-bold'>Remove</Button>
                              </div>
                          </div>
                      )
                  }
              </div>
              <div className='bg-[#e2e8f0] rouned-lg w-72  p-6'>
              <div>
                      <h4 className='font-bold text-xl m-2 text-[#94a3b8]'>Total:</h4>
                      <h2 className='font-extrabold text-3xl m-2'>${totalPrice}</h2>
                  </div>
                  <Button className='bg-[#db2777] w-full text-xl text-white rounded font-bold p-6'>
                      Checkout
                  </Button>
                  <hr className='my-4 font-bold'/>
                  <h4 className='font-bold text-xl m-2'>Country </h4>
                  <hr className='my-4 font-bold'/>
                  <div>
                      <SelectCountryComponent></SelectCountryComponent>
                  </div>

              </div>
          </div>
      </main>

  )
}
