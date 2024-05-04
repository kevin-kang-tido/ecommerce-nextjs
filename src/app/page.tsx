
import ListProduct from "@/components/layout/listProduct/ListProduct";
import "./globals.css";
import { CaroselTopComponent } from "@/components/layout/carosel/CaroselTopComponent";
import CarouselComponentFetch from "@/components/layout/listProduct/CarouselComponentFetch";


export default function Home() {
  console.log("This is home page.tsx!");
  return (
    <main>
      <CaroselTopComponent/>
       {/* <h2 className='font-bold text-center text-2xl mb-12'>Pupolar Products</h2> */}
      <ListProduct></ListProduct>
      {/*<CarouselComponentFetch></CarouselComponentFetch>*/}
    </main>
  );
}
