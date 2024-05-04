'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import email from 'next-auth/providers/email';
import style from './style.module.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { BASE_URl }  from"@/lib/constants";

type ValuesType = {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name:string;
}
const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$");
// validatationSchema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password1: Yup.string().min(8,"Password is too short!,At least 8 chars")
  .matches(strongPasswordRegex, "Password must contain at least one upper case English letter, one lower case English letter, one digit and one special character")
  .required("Password is Required"),
  password2: Yup.string()
  .oneOf([Yup.ref("password1")], "Passwords must match")
  .required("Required"),
  first_name: Yup.string().required('First Name is Requied!'),
  last_name: Yup.string().required('Last Name is Requied!'),

})

const initialValues:ValuesType = {
     email:'',
     password1:'',
     password2:'',
     first_name:'',
     last_name:''  
}

export default function Login() {
  const[loading,setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const hanleShowPassword = () => {
    setShowPassword(!showPassword);
  }
    // handle all submit (submit all form to an api)
  const handleAllSubmit = (values:ValuesType) => {
    setLoading(true);
    // fetch to domain api
    fetch(`${BASE_URl}/api/user/register/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(values),
    })
    .then((res) => res.json())
    .then((data) =>{
      console.log("Here is data register: ",data);
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  if(loading){
    return(
      <div className={`${style.container}`}>
        <h1 className='text-6xl font-bold'>
          Loading....
        </h1>
      </div>
    )
  }

  return (
    <main className={`${style.container}`}>
    <Formik  
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values,action)=>{
            // console.log(values);
            handleAllSubmit(values);

          }}
          
    >
      <Form className='bg-[#e7e5e4] rounded-lg w-96 p-12'>
        <h1 className={`${style.title}`}>Resigter</h1>
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
        {/* first_name */}
        <div className='mb-5'>
           <label htmlFor="first_name"className={`${style.lable}`}>First Name</label>
           <Field type="first_name" name="first_name" id="first_name" className={`${style.input}`} />
           <ErrorMessage 
               name="first_name"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* last_anme */}
        <div className='mb-5'>
           <label htmlFor="last_name"className={`${style.lable}`}>Last Name</label>
           <Field type="last_name" name="last_name" id="last_name" className={`${style.input}`} />
           <ErrorMessage 
               name="last_name"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* password 1 */}
        <div className='mb-5'>
           <label htmlFor="password1"className={`${style.lable}`}>Password</label>
           <div className='relative'>
              <Field 
              type={showPassword? "text":"password"}

               name="password1"
               id="password1"
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
               name="password1"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* password2 */}
        <div className='mb-5'>
           <label htmlFor="password2"className={`${style.lable}`}>Password</label>
           <div className='relative'>
              <Field 
              type={showPassword? "text":"password"}
               name="password2"
               id="password1"
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
               name="password2"
               component="div"
               className={`${style.error}`}
           />
        </div>
        {/* autocomplete*/}
        <button type="submit" className={`${style.button}`}>
          Regiter
        </button>
      </Form>
    </Formik>
    </main>
  )
}
