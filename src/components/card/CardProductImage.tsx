import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setProduct} from "@/redux/feature/product/productSlice";

export  type imageSelect = {
    id:number,
    name:string,
    image:string,
    type: string
    // onClick?: () => void;
}

export default function CardProductImageComponent({id,name,image,type}:imageSelect) {
    const product = useAppSelector((state)=> state.product.product)
    const dispatch = useAppDispatch();

    const handleImageClicked=()=>{
        alert("Image is clicked ")
        console.log("Image is clicked ")
        if(type=="product")
        dispatch(setProduct({...product,image:{id,name,image}}))
        if(type=="category"){
            dispatch(setProduct({...product,category:{id,name,image}}))
        }
    }
    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"

        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover h-20"
                            height={100}
                            shadow="md"
                            src={image}
                            width="100%"
                            onClick={handleImageClicked}
                        />
                    </div>
                    <div className="flex flex-col col-span-6 top-0 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h1 className="text-large font-medium mt-2 line-clamp-1">Hello {name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
