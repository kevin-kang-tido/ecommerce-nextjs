'use client'
import React, {useEffect, useState} from 'react';
import {ENDPOINT} from "@/lib/constants";
import {ProductType} from "@/lib/definitions";
import CaroselComponent from "@/components/layout/carosel/CaroselComponent";


async function getProduct() {
    const data = await fetch(ENDPOINT);
    const res = await data.json();
    return res.results;
}

export default function CarouselComponentFetch() {
    // const products = await getProduct();
    const [products,setProducts] = useState([]);

    useEffect(()=> {
        getProduct()
            .then((data) => setProducts(data));
    },[])

    return (
        <>
            {
                products.map((product:ProductType) => {
                    return(
                        <CaroselComponent
                            id={product.id}
                            category={product.category}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    )
                })
            }
        </>
    );
}
