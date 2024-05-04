
"use client";

import { Carousel } from "flowbite-react";
import {ProductType} from "@/lib/definitions";





export default function CaroselComponent({image}:ProductType) {

  return (
    <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96 mx-12">
        <Carousel>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
        </Carousel>
        <Carousel indicators={false}>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
            <img src={image} alt="image"/>
        </Carousel>
    </div>
  );
}
