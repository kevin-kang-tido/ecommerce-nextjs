'use client'
import React from 'react';
import Image from 'next/image';
import {ProductType} from "@/lib/definitions";
import { FaStar } from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import { useAppDispatch } from "@/redux/hooks";
import {addToCart, selectProducts} from "@/redux/feature/cart/cartSlice";


export default function  DetailProductCard ({id,category,name,price,image,onClick,}:ProductType){
  const dispatch = useAppDispatch();
  const safeImage = image || '';
  return (
      <>
        <section className="my-9">
          <h2 className="max-w-2xl mt-12 text-3xl font-extrabold items-center tracking-tight leading-none m-4 md:text-3xl xl:text-3xl dark:text-white text-center">Detail Products</h2>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 gap-4 container mx-12">
              <div className="col-span-12 rounded-lg md:col-span-12 lg:col-span-6 sm:h-auto h-[300px]" style={{ backgroundColor: '#C3DDFD' }}>
                <div className="flex items-center justify-center h-full p-4">
                  <Image width={300} height={300} className="w-full h-full rounded-lg object-cover rounded-5" src={safeImage} alt="" />
                </div>
              </div>
              <div className="rounded-lg bg-blue-600 sm:col-span-12 md:col-span-12 lg:col-span-6 col-span-12 text-[11px] p-4 " style={{ backgroundColor: '#C3DDFD' }}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="md:text-2xl sm:text-2xl text-base font-bold mb-2">{name}</h2>
                    <h2 className="text-xl font-bold mb-2">${price}</h2>
                    <p className="text-gray-300 text-[10px] sm:text-blue-800 sm:text-[9px] md:text-base"
                       style={{color: '#000000'}}>{category}</p>
                    <hr className="my-4 font-light"/>
                    <div className='flex m-2'>
                      <FaStar className='text-2xl mx-2 text-[#fbbf24]'/>
                      <FaStar className='text-2xl mx-2 text-[#fbbf24]'/>
                      <FaStar className='text-2xl mx-2 text-[#fbbf24]'/>
                      <FaStar className='text-2xl mx-2 text-[#fbbf24]'/>
                    </div>

                    <hr className="my-4 font-light"/>
                    <div className="mb-4">
                      <h2 className="text-gray-300 m-4 text-lg sm:xl md:text-2xl lg:text-3xl font-bold"
                          style={{color: '#000000'}}>Color</h2>
                      <div className="flex space-x-2">
                        <button className="h-12 w-12 bg-white rounded-full"></button>
                        <button className="h-12 w-12 rounded-full" style={{backgroundColor: '#D63501'}}></button>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-gray-300 m-4 text-lg sm:xl md:text-2xl lg:text-3xl font-bold"
                          style={{color: '#000000'}}>Size</h2>
                      <div className="flex space-x-2 m-2">
                        <button className="h-12 w-12 bg-[#FFFFFF] font-bold rounded-full">XS</button>
                        <button className="h-12 w-12 bg-[#7828c8] font-bold rounded-full">S</button>
                        <button className="h-12 w-12 bg-[#f5a524] font-bold rounded-full">M</button>
                        <button className="h-12 w-12 bg-[#f31260] font-bold rounded-full">XL</button>
                      </div>

                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="h-20 border border-gray-100 flex items-center p-4 rounded-md">
                      <i className="fa-solid fa-truck-fast text-blue-600"></i>
                      <p className="text-[10px] md:ml-2 md:text-[#0a0a0a] sm:text-blue-800 sm:text-[9px] md:text-xl">Free Delivery<br />
                        <span className="text-[10px] md:text-base sm:text-blue-800 sm:text-[9px]">Enter your postal code for Delivery Availability</span></p>
                    </div>
                    <div className="h-20 border border-gray-100 flex items-center p-4 rounded-md">
                      <i className="fa-solid fa-rotate text-blue-600"></i>
                      <p className="text-[10px] md:ml-2 md:text-[#0a0a0a] sm:text-blue-800 sm:text-[7px] md:text-xl">Return Delivery<br />
                        <span className="text-[10px] sm:text-blue-800 sm:text-[9px] md:text-xl">Free 30 Days Delivery Returns. Details</span></p>
                    </div>
                    {/*// add button here*/}
                    <div>
                      <Button
                          onClick={() => dispatch(addToCart({id,category,name,price,image}))}
                          className='my-4 rounded p-4 text-white font-bold bg-[#db2777]'  variant="flat">
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>
  );
};

