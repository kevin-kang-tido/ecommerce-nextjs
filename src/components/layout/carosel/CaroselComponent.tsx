
"use client";

import { Carousel } from "flowbite-react";
import {ProductType} from "@/lib/definitions";
import Image from "next/image";





export default function CaroselComponent({image}:ProductType) {

  return (
    <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96 mx-12">
        <Carousel>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
        </Carousel>
        <Carousel indicators={false}>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
            <Image width={70} height={70} src={image} alt="image"/>
        </Carousel>
    </div>
  );
}
