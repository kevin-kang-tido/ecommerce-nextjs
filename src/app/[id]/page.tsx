import React from 'react';
import {ENDPOINT} from "@/lib/constants";

export type ParamsProps= {
    params:{
      id:number;
    };
};

// fetch to get detail page 
async function getDetailProducts(id:number){
    const productDetail = await fetch(`https://store.istad.co/api/products/${id}`);
    return productDetail.json();
}

export default async function page({params}:ParamsProps) {
    const id = params.id;
    const detailProduct = getDetailProducts(id);
    console.log("Here is the Data : ",detailProduct);
  return (
    <main>
        <div className='h-screen grid place-content-center'>
            <h1>This is Detail page</h1>
             {/*<h2>{detailProduct.name} </h2>*/}
        </div>
    </main>
  )
}
