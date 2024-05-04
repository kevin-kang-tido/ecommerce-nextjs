import React from 'react';
import Image from 'next/image';
import {ProductType} from "@/lib/definitions"; // Assuming you're using Next.js for the Image component

const DetailProductCard = ({ image, price, name, category,id }:ProductType) => {
  const safeImage = image || '';
  return (
      <>
        <section className="my-9">
          <h2 className="max-w-2xl text-3xl font-extrabold  items-center tracking-tight leading-none m-4 md:text-3xl xl:text-3xl dark:text-white text-center">Detail Products</h2>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 gap-4 container mx-12">
              <div className="col-span-12 rounded-lg md:col-span-12 lg:col-span-6 sm:h-auto h-[300px]" style={{ backgroundColor: '#C3DDFD' }}>
                <div className="flex items-center justify-center h-full p-4">
                  <Image width={500} height={500} className="w-full h-full rounded-lg object-cover rounded-5" src={safeImage} alt="" />
                </div>
              </div>
              <div className="rounded-lg bg-blue-600 sm:col-span-12 md:col-span-12 lg:col-span-6 col-span-12 text-[11px] p-4 " style={{ backgroundColor: '#C3DDFD' }}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="md:text-2xl sm:text-2xl text-base font-bold mb-2">{name}</h2>
                    <h2 className="text-xl font-bold mb-2">${price}</h2>
                    <p className="text-gray-300 text-[10px] sm:text-blue-800 sm:text-[9px] md:text-base" style={{ color: '#000000' }}>{category}</p>
                    <hr className="my-4" />
                    <div className="mb-4">
                      <h2 className="text-gray-300" style={{ color: '#000000' }}>Color</h2>
                      <div className="flex space-x-2">
                        <button className="h-6 w-6 bg-white rounded-full"></button>
                        <button className="h-6 w-6 rounded-full" style={{ backgroundColor: '#D63501' }}></button>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-gray-300" style={{ color: '#000000' }}>Size</h2>
                      <div className="flex space-x-2 m-2">
                        <button className="h-6 w-6 bg-white rounded-full">XS</button>
                        <button className="h-6 w-6 bg-white rounded-full">S</button>
                        <button className="h-6 w-6 bg-red-700 rounded-full">M</button>
                        <button className="h-6 w-6 bg-white rounded-full">XL</button>
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
                    {/* Add more delivery options if needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default DetailProductCard;