'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { increment } from "@/redux/feature/counter/counterSlice";
import {addToCart, selectProducts} from "@/redux/feature/cart/cartSlice";
import { ProductType } from "@/lib/definitions";
// import { ProductType } from "@/lib/definitions";


export default function CardProducts({id,category,name,price,image,onClick,}:ProductType) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  console.log("This is testing Global state: ",state);
  return (
      <Card className="row m-3">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold bg-[#db2777] rounded-lg p-2">New</p>
          <small className="text-default-500">${price}</small>
          <h4 className="font-bold text-large">{category}</h4>
          <h4 className="text-large clamp-line-1">{name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[200px] sm:w-[400px] md:h-[200px] :w-[200px]"
            src={image}
          />
          <div className='flex m-2'>
            <FaStar className='text-lg text-[#fbbf24]'/>
            <FaStar className='text-lg text-[#fbbf24]'/>
            <FaStar className='text-lg text-[#fbbf24]'/>
            <FaStar className='text-lg text-[#fbbf24]'/>
          </div>
        </CardBody>
        <div className='flex justify-between'>
             <button
                 onClick={() => dispatch(addToCart({id,category,name,price,image}))}
                 className='flex items-center text-sm btn bg-[#2563eb]  p-2 rounded-sm text-[#e2e8f0]'>
               <FaCartPlus className='mr-2 text-lg'/> Add To Cart 
            </button>
            <button
                onClick={onClick}
                className='flex items-center text-sm btn bg-[#d1d5db]  p-2 rounded-sm text-[#e2e8f0]'>
               <FaHeart  className='mr-2 text-lg text-[#db2777]'/>
            </button>
          </div>
      </Card>
  );
}
