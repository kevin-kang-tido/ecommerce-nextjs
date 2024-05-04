import React from 'react';
import {Image} from "@nextui-org/react";

function AboutUsComponent() {
    return (
        <section className="container mx-auto p-[40px] bg-blue-100 h-auto w-auto m-12">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="order-1">
                    <h2 className="sm:mx-24 lg-mx-24 md:mx-24 mx-24 max-w-2xl mb-4 text-base font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-blue-800">
                        Our Story</h2>
                    <p className="text-[9px] sm:mx-24 md:text-base md:text-[12px]">
                        Empowering your gaming experience, our dedicated team at cam shop is excited to unveil our
                        cutting-edge e-commerce website. Dive into a world where innovation meets convenience, featuring
                        a curated selection of computer, phone, and game controller accessories. <br/> <br/>
                        We are re committed to providing enthusiasts with seamless online shopping, ensuring you stay
                        ahead in the gaming realm. Explore the possibilities, level up your gear, and redefine your
                        gaming journey with us.
                    </p>
                </div>
                <div className="order-2 col-span-1 mt-12">
                    <Image
                        width={400}
                        height={300}
                        className='object-cover'
                        alt="NextUI hero Image with delay"
                        src="https://i.pinimg.com/564x/0c/00/64/0c00644b156636cb909551ec13081320.jpg"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutUsComponent;