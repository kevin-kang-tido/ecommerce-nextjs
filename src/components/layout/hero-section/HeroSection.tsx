'use client'

import Image from 'next/image';
import React from 'react'

const HeroSection = () => {
    return (
        <section className="w-full mt-12 bg-[#cbd5e1] dark:bg-gray-900 shadow-md hover:shadow-sm-gray-300">
            <div className="grid mx-24 max-w-screen-xl px-4 py-8  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h3 className="max-w-2xl mb-4 text-sm font-extrabold tracking-tight leading-none md:text-2xl xl:text-2xl dark:text-white">Life is short Buy Now</h3>
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">SALE 36% OFF</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Introducing the newest addition to our lineup – the cutting-edge [Phone Model]. With its lightning-fast processor, stunning display, and AI-powered camera.</p>
                    <a href="#" className="bg-[#ED6533] inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-[#b14a25] focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get started

                    </a>
                    <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Speak to Sales
                    </a>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image width={500} height={500} src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;