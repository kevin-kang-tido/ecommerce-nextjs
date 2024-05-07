'use client'
import React, {useEffect, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './style.module.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import {Link, Button} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import { BASE_URL} from "@/lib/constants";
import LoadingComponent from "@/app/loading";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {selectToken, setAccessToken} from "@/redux/feature/auth/authSlice";
import {fetchUserProfile, selectAvatar, selectBio} from "@/redux/feature/userProfile/userProfileSlice";
import {useGetUserQuery} from "@/redux/service/user";
// import {selectToken} from "@/redux/feature/auth/tokenSlice";


type ValuesType = {
    email: string;
    password: string;
}
// validatationSchema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required("Password is Required"),
})

const initialValues:ValuesType = {
     email:'',
     password:'',
}
export default function Login() {
   // extracting data from use session as session
  const { data: session } = useSession();
  const route = useRouter();
  // loading section 
  const[loading, setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);
  const hanleShowPassword = () => {
    setShowPassword(!showPassword);

  }

  // login
  const accessToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();


  console.log("This is AccessToken from Redux Store : ",accessToken);

  const [user,setUser] = useState(null);
  // get user data
    const { data:users, isSuccess, isError, error } = useGetUserQuery({});
    console.log("Get Page data: ",users);
    console.log("Get Session data : ",session);




 //  login to api
 // handle all submit (submit all form to an api)
 //  const  handleSubmit = (values:ValuesType) => {
 //    setLoading(true);
 //    // fetch to domain api
 //    fetch(`${BASE_URL}/api/user/login/`,{
 //      method:"POST",
 //      headers:{
 //        "Content-Type":"application/json",
 //      },
 //      body:JSON.stringify(values),
 //    })
 //    .then((res) => res.json())
 //    .then((data) => {
 //      console.log("Here is data login: ",data);
 //
 //      setLoading(false);
 //
 //    })
 //    .catch((error) =>{
 //      console.log(error);
 //    })
 //  }

  //   const  handleSubmit = async (values:ValuesType) => {
  //     const {email,password} = values;
  //       setLoading(true);
  //       const res = await fetch(
  //           `${process.env.DJANGO_API_URL}/api/user/login/`,
  //           {
  //                method:"POST",
  //                headers:{
  //                  "Content-Type":"application/json",
  //                },
  //                body:JSON.stringify({email,password}),
  //       });
  //       res.json()
  //           .then((data) => {
  //               setLoading(false);
  //               console.log("data in login pge: ", data);
  //               dispatch(setAccessToken(data.accessToken));
  //               // console.log("Here is AccessToken: ",data);
  //               // dispatch(setAccessToken(data.accessToken));
  //           })
  //           .catch((error) => {
  //               console.error("Error:", error);
  //           });
  //
  //       console.log("=====> Page login : ",res);
  //
  //       if (res.status === 200) {
  //           route.push("/");
  //       }
  // }

    const handleSubmit = (values: ValuesType) => {
        setLoading(true);
        fetch(process.env. NEXT_PUBLIC_API_URL_LOCAL+ `/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Here is date to login: ",data);
                setLoading(false)
                dispatch(setAccessToken(data.accessToken));
                if(data.accessToken != null){
                    route.push('/user-page');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);



  // checking if sessions exists
  if (session) {
  // rendering components for logged in users
  return (
    <div className="rounded-lg flex items-center justify-center p-4">
      <div className='bg-[#bfdbfe] rounded-lg p-12 shadow-lg'>
        <div className="w-44 h-44 relative mb-4 ml-[80px]">
          <Image src={session.user?.image as string} fill alt="" className="object-cover rounded-full"/>
          </div>
          <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
          <p className="font-bold mb-4">{session.user?.email}</p>

          <div className='flex justify-between'>
              <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
              <Button
                as={Link}
                href='/' className='bg-[#0ea5e9] font-bold text-sm p-6'
                variant="flat"
                >
                  Home Page
              </Button>
          </div>
       </div>
      </div>
      )
    }


    if(loading){
        return(
            <div className={`${style.container}`}>
                <LoadingComponent></LoadingComponent>
            </div>
        )
    }

  return (
    <main className={`${style.container}`}>
    <div className='bg-[#e7e5e4]  rounded-lg w-96 p-12'>
    <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values,action)=>{
            handleSubmit(values);
            console.log("Here is Values: ",values);
          }}
    >
      <Form>
        <h1 className={`${style.title}`}>Login</h1>
        {/* email part  */}
        <div className='mb-5'>
           <label htmlFor="email"className={`${style.lable}`}>Your Email</label>
           <Field type="email" name="email" id="email" className={`${style.input}`} />
           <ErrorMessage
               name="email"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* password 1 */}
        <div className='mb-5'>
           <label htmlFor="password"className={`${style.lable}`}>Password</label>
           <div className='relative'>
              <Field
              type={showPassword? "text":"password"}
               name="password"
               id="password"
               className={`${style.input}`} />
               {/* hide and show pasword */}
              {!showPassword ? <FaEyeSlash
                 onClick={() => hanleShowPassword()}
                 className="absolute right-2 top-3 text-lg cusor-pointer "/>
              :
              <FaEye
                onClick={() => hanleShowPassword()}
                className="absolute right-2 top-3 text-lg cusor-pointer "/>
              }
           </div>
           <ErrorMessage
               name="password"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* autocomplete*/}
        <button
            type="submit"
            // onClick={() => handleSubmit}
            className={`${style.button}`}>
         Login
        </button>
      </Form>
    </Formik>
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl mb-4"></p>
      <button className="w-full mb-4 flex gap-4 items-center bg-blue-600 py-2 px-6 rounded-md text-white " onClick={() => signIn('google')}><FaGoogle />Sign in with google</button>
      <button className="w-full mb-4 flex gap-4 items-center bg-none border-gray-300 border py-2 px-6 rounded-md " onClick={() => signIn('github')}> <FaGithub /> Sign in with github</button>
    </div>
   <p className="my-4">
        Don&apos;t have an account?{' '}
        <span className="font-bold">
          <Link href="/register">Sign up for free</Link>
        </span>
   </p>

  </div>
  </main>
  )
 }


