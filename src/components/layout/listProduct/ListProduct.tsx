'use client'
import CardProducts from '@/components/card/ListCardComponent'
import {BASE_URL, ENDPOINT} from '@/lib/constants'
import { ProductType } from '@/lib/definitions'
import {Pagination} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";



//Pagination
async function getProduct() {
  const data = await fetch(ENDPOINT);
  const res = await data.json();
  return res.results;
}



console.log("Hello world!!!");

export default  function ListProduct() {
    const route = useRouter();
  // const products = await getProduct();

    // pagiantion
    const [products,setProducts] = useState([]);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);

    useEffect(()=> {
        getProduct()
            .then((data) => setProducts(data));
    },[])
    console.log("Here is the products: ",products);

  // pagination
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/products/?page=${currentPage}&page_size=10`);
            const data = await response.json();
            console.log(data.results)
            setProducts(data.results);
            const totalPage = Math.ceil(data.total/10);
            setTotalPage(totalPage); // Assuming 10 items per page
        };
        fetchData();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
  // pagination

  return (
      <main>
          <h1 className='text-center items-center font-bold text-3xl my-4'>Top Products</h1>
          <div className='container flex items-center justify-center'>
              <div className='grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg-grid-cols-4'>
                  {
                      products.map((product: ProductType) => {
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
              <Pagination isCompact showControls total={totalPages} initialPage={1} page={currentPage}
                          onChange={onPageChange}/>
          </div>
      </main>
  )
}
