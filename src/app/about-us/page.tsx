import React from 'react'
import AboutUsComponent from "@/components/layout/about-us-page/AboutUsComponent";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "About us",
    description: "This is about us shop",
    keywords: ['shop', 'ecommerce', 'sell']
};
export default function page() {
  return (
    <div>
       <AboutUsComponent></AboutUsComponent>
    </div>
  )
}
