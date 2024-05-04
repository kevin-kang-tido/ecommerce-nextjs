'use client'
import CardProducts from '@/components/card/ListCardComponent'
import { ENDPOINT } from '@/lib/constants'
import { ProductType } from '@/lib/definitions'
import Link from 'next/link'
// import React from 'react'
import React, { useEffect, useState } from "react";
import {object} from "yup";
import {useRouter} from "next/navigation";

async function getProduct() {
  const data = await fetch(ENDPOINT);
  const res = await data.json();
  return res.results;
}



console.log("Hello world!!!");


export default  function ListProduct() {
    const route = useRouter();
  // const products = await getProduct();
  const [products,setProducts] = useState([]);

  useEffect(()=> {
    getProduct()
        .then((data) => setProducts(data));
  },[])


  console.log("Here is the products: ",products);

  return (
      <main className='container w-auto mx-[260px]'>
        <h1 className='text-center items-center font-bold text-3xl my-4'>Top Products</h1>
        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg-grid-cols-4'>
          {
            products.map((product: ProductType) => {
              return (
                  <div key={product.id} className='col'>

                    <CardProducts
                        onClick={() => route.push(`/${product.id}}`)}
                        id={product.id}
                        category={product.category}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                  </div>
              )
            })
          }
        </div>
      </main>
  )
}
