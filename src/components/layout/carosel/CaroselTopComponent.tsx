
"use client";

import { Carousel } from "flowbite-react";
import {Image} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

export function CaroselTopComponent() {
  return (
  <main className='flex justify-center items-center mt-16'>
    <section className="h-auto w-[95%] sm:h-64 xl:h-80 2xl:h-96 bg-[#cbd5e1] rounded-lg">
         <div className='flex justify-beweent'>
            <div className='w-full'>
              <h2 className='text-xl mx-4 sm:text-xl md:text-2xl  font-bold my-2 md:mx-[240px]'>NIKES SUMMBER</h2>
               <h4 className='text-sm mx-4 sm:text:sm md:text-xl font-bold text-[#1e293b] md:mx-[240px]'>Collections 2022</h4>
               <p className='text-sm my-4 mx-4 md:mx-[240px]'>sneaker manufacture mens shoes soft sole breathable flying casual shoes new all-match sports running shoes men</p>
               <Button className='mx-4 md:mx-[240px]' color="primary" variant="shadow">
                Buy Now
              </Button>
            </div>
            <div className='md:flex w-full rounded-lg rounded-blue-700 md:mr-4'>
            <Image
                  className='flex mt-4'
                  width={250}
                  height={300}
                  src="https://i.pinimg.com/564x/67/25/44/672544decbd951740836969fd59eed3c.jpg"
                  fallbackSrc="https://via.placeholder.com/300x200"
                  alt="NextUI Image with fallback"
                />
                <Image
                  className='hidden  md:flex mt-[100px] mx-2'
                  width={250}
                  height={300}
                  src="https://i.pinimg.com/564x/67/25/44/672544decbd951740836969fd59eed3c.jpg"
                  fallbackSrc="https://via.placeholder.com/300x200"
                  alt="NextUI Image with fallback"
                />
                  <Image
                  className='hidden ml-2  md:flex'
                  width={250}
                  height={300}
                  src="https://i.pinimg.com/564x/67/25/44/672544decbd951740836969fd59eed3c.jpg"
                  fallbackSrc="https://via.placeholder.com/300x200"
                  alt="NextUI Image with fallback"
                />
            </div>
         </div>
        </section>
    </main>
    
  );
}
