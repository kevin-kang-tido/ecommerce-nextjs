import React from'react';
import PolicyComponent from "@/components/layout/policy/PolicyComponent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Policy",
    description: "This is policy page",
    keywords: ['shop', 'ecommerce', 'sell']
};
export default function page(){
    return (
        <>
         <PolicyComponent></PolicyComponent>
        </>
    )
}