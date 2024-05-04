import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {ProductType} from "@/lib/definitions";
import {useAppSelector,useAppDispatch} from "@/redux/hooks";
import {removeFromCart, selectProducts} from "@/redux/feature/cart/cartSlice";

export default function CartComponent({id,category,name,price,image,onClick}:ProductType) {
     const dispatch = useAppDispatch();
     const products = useAppSelector(selectProducts);
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
                            className="object-cover h-36"
                            height={200}
                            shadow="md"
                            src={image}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 top-0 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{category}</h3>
                                <p className="text-lg text-foreground/80">${price}</p>
                                <h1 className="text-large font-medium mt-2 line-clamp-1">{name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
