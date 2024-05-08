'use client'

import React from 'react';
import Image from "next/image";
import {Button, Link} from "@nextui-org/react";
import {useGetUserQuery} from "@/redux/service/user";

// import {selectToken} from "@/redux/feature/auth/tokenSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import success = toast.success;

function Page() {
    const notify = () =>
        success("Login Successful!!");
    // get user data
    const { data:users, isSuccess, isError, error } = useGetUserQuery({});
    console.log("Get Page data: ",users);
    if (users) {
        // rendering components for logged in users
        return (
            <div className="rounded-lg flex items-center justify-center p-4 mt-12">
                <div className='bg-[#bfdbfe] rounded-lg p-12 shadow-lg'>
                    <div className="w-44 h-44 relative mb-4 ml-[80px]">
                        <Image src={users.user?.image as string || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"} fill alt="" className="object-cover rounded-full"/>
                    </div>
                    <p className="text-2xl mb-2">Welcome <span className="font-bold">{users.user?.name}</span>. Signed In As</p>
                    <p className="font-bold mb-4">{users.user?.email}</p>

                    <div className='flex justify-between'>
                        <Button
                            as={Link}
                            href='/my-shop' className='bg-[#0ea5e9] font-bold text-sm p-6 mr-4'
                            variant="flat"
                        >
                            My Shop
                        </Button>
                        {/*<button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>*/}
                        <Button
                            as={Link}
                            href='/' className='bg-[#0ea5e9] font-bold text-sm p-6'
                            variant="flat"
                            onClick={notify}
                        >
                            <ToastContainer className='mt-12'/>
                            Home Page
                        </Button>

                    </div>
                </div>
            </div>
        )
    }
}

export default Page;