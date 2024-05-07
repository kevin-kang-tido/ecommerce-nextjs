import React from 'react';
import {ENDPOINT} from "@/lib/constants";
import CardDetailProduct from "@/components/card/CardDetailProduct";
import {id} from "postcss-selector-parser";



export type ParamsProps= {
    params:{
      id:number;
    };
};

// fetch to get detail page.tsx
async function getDetailProducts(id:number){
    // Assuming this is inside a React component or an async function
    // const PageComponent = await import(`../../../../../src/app/service/${id}/page.js`);
    const productDetail = await fetch(`${ENDPOINT}/${id}`);
    console.log("Detail product : ",productDetail);
    return productDetail.json();
}
export async function generateMetadata({params}: any) {
    const id = params.id
    const product = await getDetailProducts(id);
    return {
        title: product?.title,
        description: product.description,
        openGraph: {
            images: product.image,
        },
    }

}


export default async function page({params}:ParamsProps) {
    const id = params.id;
    const detailProduct = await getDetailProducts(id);
    console.log("Here is the Detail Data  : ",detailProduct);
  return (
    <main>
        {/*<div className='h-screen grid place-content-center'>*/}
        {/*    <h1>This is Detail page.tsx :{id}</h1>*/}
        {/*     /!*<h2>{detailProduct.name} </h2>*!/*/}
        {/*</div>*/}
        <div className='mt-16'>
            <CardDetailProduct
                id={detailProduct.id}
                category={detailProduct.category}
                name={detailProduct.name}
                price={detailProduct.price}
                image={detailProduct.image}
            />
        </div>
    </main>
  )
}
