'use client'
import CardProducts from '@/components/card/ListCardComponent'
import {BASE_URL, ENDPOINT} from '@/lib/constants'
import { ProductType } from '@/lib/definitions'

import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import {useGetProductsQuery} from "@/redux/service/product";
import {Pagination} from "@nextui-org/react";

//Pagination
console.log("Hello world!!!");

export default  function ListProduct() {
    const route = useRouter();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const {data,error:errorGetAllProduct,isFetching:isFetchingGetAllProduct}  = useGetProductsQuery({
        page:currentPage,
        pageSize:12,
    });

// Inside your component
    useEffect(() => {
        // This will trigger a re-fetch when currentPage changes
    }, [currentPage]);

// end Pagination

    return (
      <main>
          <h1 className='text-center items-center font-bold text-3xl my-4'>Top Products</h1>
          <div className='container flex items-center justify-center'>
              <div className='grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg-grid-cols-4'>
                  {
                      data?.results.map((product: ProductType) => {
                          return (
                              <div key={product.id} className='col'>
                                  <CardProducts
                                      onClick={() => route.push(`/${product.id}`)}
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
          </div>
          <div className="flex overflow-x-auto sm:justify-center my-8">
              <Pagination
                  isCompact
                  showControls
                  total={10}
                  initialPage={1}
                  onChange={(newPage) => setCurrentPage(newPage)}
              />

          </div>
      </main>
  )
}
