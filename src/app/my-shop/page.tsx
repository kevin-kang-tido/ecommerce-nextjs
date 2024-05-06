import React from 'react'
import ProductTable from "@/components/table/ProductTable";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "My Shop",
    description: "This is about us shop",
    keywords: ['shop', 'ecommerce', 'sell']
};
export default function page() {
  return (
    <div className='mt-12 md:m-12 sm:m-12'>
      <ProductTable/>
    </div>
  )
}
