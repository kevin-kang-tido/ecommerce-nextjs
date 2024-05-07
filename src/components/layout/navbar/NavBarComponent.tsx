"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu, NavbarMenuItem
} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import {navbarItem, navbarItemPlus} from './menu';
import {usePathname, useRouter} from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
import{ signOut,useSession } from 'next-auth/react';
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {selectProducts} from "@/redux/feature/cart/cartSlice";
import {useGetUserQuery} from "@/redux/service/user";
import {Avatar, AvatarIcon} from "@nextui-org/react";
import {clearAccessToken, selectClearAccessToken, selectToken} from "@/redux/feature/auth/authSlice";
import {token} from "stylis";
import userProfileSlice from "@/redux/feature/userProfile/userProfileSlice";

export type UserDataType = {
  userProfile: string;
  userEmail: string;
  userUsername: string;
};

export default function NavBarComponent() {
  // const pathname = usePathname();
  const { data: session } = useSession();

  const route = useRouter();
  // redux 
  const count = useAppSelector(selectProducts).length;
  // open icon
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // get user
  const { data:users, isSuccess, isError, error } = useGetUserQuery({});
  console.log("Get Page data: ",users);
  console.log("Get Session data : ",session);

  // clear access token
  const dispatch = useAppDispatch();

   let userData:UserDataType;

   if(session != null){
       userData = {
            userProfile:session.user?.image || "",
            userEmail:session.user?.email || "",
            userUsername:session.user?.name || "",
       };
   }else if(isSuccess){
     userData = {
       userProfile:users.user?.image || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
       userEmail:users.user?.email || "",
       userUsername:users.user?.first_name || "",
     }
   }else{
     userData = {
       userProfile:"",
       userEmail:"",
       userUsername:"",
     }
   }


  // handle logout
  const handleLogout = async () => {
    fetch(process.env.NEXT_PUBLIC_API_URL_LOCAL + "/logout", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({}),
    })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data from logout : ", data);
        })
        .catch((error) => {
          console.log(error);
        });
    dispatch(clearAccessToken());
  };


  const pathname = usePathname();
  if(pathname === "/login" || pathname === "/register"){
    return null
  }



  return (
    <>
     {/* // testing nev */}
    <Navbar position="static" className='top-0 fixed' onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden font-extrabold mx-2"
        />
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">EazyMark</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navbarItem.map((item,index:any) => (
          <NavbarItem key={index}>
              <Link
                color="foreground"
                href={item.path}
                className={`${
                  pathname === item.path && "font-bold text-blue-800"
                }`}
              >
                {item.title}
              </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* search section  */}
        <NavbarItem className='ml-2'>
          <Button as={Link} className='bg-[#f9fafb]' href="#" variant="flat">
            <FaSearch className='text-2xl text-[#1e293b]'/>
          </Button>
        </NavbarItem>
      {/* cart section */}
      <NavbarItem>
          <Button className='bg-[#f9fafb]' onClick={()=> route.push('/cart')}  variant="flat">
            <FaCartPlus className='text-2xl text-[#1e293b]'/>
            <div className=''>
              <sup className='text-[14px] font-bold rounded-full p-[3px] border border-white shadow-lg  bg-[#db2777] text-[#f8fafc]'>
                {count}
              </sup>
            </div>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {
            userData && Object.values(userData).every(value => value === "")? (
                <Button as={Link} color="primary" href="/login" variant="flat">
                  Login
                </Button>
            ) : (
                <div className='flex gap-5'>
                  <Image
                      src={userData.userProfile}
                      width={42}
                      height={40}
                      alt="user_profile"
                      className="object-cover rounded-full border border-yellow-500"
                  />
                  <Button
                      as={Link}
                      onClick={() => {signOut();handleLogout();}}
                      className="bg-gradient-to-r from-blue-500 to-pink-400 text-white"
                      variant="flat"
                      href="/login"
                  >
                    Sign Out
                  </Button>
                </div>
            )
          }

        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navbarItemPlus.map((item, index: any) => (
            <NavbarMenuItem key={index}>
              <Link
                  color="foreground"
                  href={item.path}
                  className={`${
                      pathname === item.path && "font-bold text-blue-800"
                  }`}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    </>
  );
}
