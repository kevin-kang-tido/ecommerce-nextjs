"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import {BASE_URL} from "@/lib/constants";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


const validationSchema = Yup.object().shape({
    image: Yup.mixed()
        .test("fileSize", "File too large", (value: any) => {
            if (!value) {
                return true;
            }
            return value.size <= FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .required("Required"),
});
function functionAlert() {
    alert("Create Products Successfully");
}

const fieldStyle = "border border-gray-300 rounded-md";



const EditProductForms = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NjcwNTg1LCJpYXQiOjE3MTI1MTA1ODUsImp0aSI6ImMwODU4MTFmZjNiNDRlNWU5YWUyNmQzOGI0OTNlNGYyIiwidXNlcl9pZCI6MTJ9.1FUM8l1yAQ65-TtNYD-UvUGNBrByltpGtPf1mcNhQpQ");
    myHeaders.append("Cookie", "csrftoken=ntSoeTzPXCbcUJyd4RYyQIIBQLulVNUHhpym1naPEocO7Uh46cH9pCBQ5J8u2jJT; sessionid=lt5uxhco8ur6sgu1v51bcrje4s8javez");

    const handleSubmitToServer = async (values: any) => {
        try {
            const response = await axios.post(
                `${BASE_URL}file/product/`,
                values.image
            );
            return response.data.image;
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateProduct = async (values: any, imageData: any) => {
        try {
            const imageUrl = await handleSubmitToServer(imageData);
            console.log("data: ", values);
            const postData = await fetch(`${BASE_URL}products/`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    ...values,
                    image: imageUrl,
                }),
            });
            console.log("post data: ", postData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cotainer mx-12 pt-9">

            <Formik
                onSubmit={(values: any, { setSubmitting, resetForm }) => {
                    console.log(values);
                    const formData = new FormData();
                    formData.append("image", values.image);
                    handleCreateProduct(values, { image: formData });
                    setSubmitting(false);
                    resetForm();
                }}
                validationSchema={validationSchema}
                initialValues={{
                    category: {
                        name: "Hiking shoes",
                        icon: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1693342954-rincon-3-64ee5ca62e001.jpg?crop=1xw:1xh;center,top&resize=980:*",
                    },
                    name: "",
                    desc: "",
                    image: undefined,
                    price:null,
                    quantity: null,
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="flex m-[30px] flex-col gap-4">
                        <h1 className='text-4xl font-bold my-4'>Edit Product </h1>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Product Name: </label>
                            <Field
                                placeholder="T-shirt"
                                className={fieldStyle}
                                name="name"
                                type="text"
                            />
                        </div>
                        {/* description */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc">Description: </label>
                            <Field
                                placeholder="This is a t-shirt"
                                className={fieldStyle}
                                name="desc"
                                type="text"
                            />
                        </div>
                        {/* price */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Price: </label>
                            <Field
                                placeholder="100"
                                className={fieldStyle}
                                name="price"
                                type="number"
                            />
                        </div>
                        {/* quantity */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Quantity: </label>
                            <Field
                                placeholder="1"
                                className={fieldStyle}
                                name="quantity"
                                type="number"
                            />
                            <div className=''>
                                <label htmlFor="price" className='my-4 text-2xl'>Product Image: </label>
                                <div className='flex my-2'>
                                    <Button  onPress={onOpen} className='w-52 px-4 py-3 bg-[#180828] text-white rounded-md'>
                                        Select Product Icon
                                    </Button>
                                </div>
                                <ErrorMessage name="image">
                                    {(msg) => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <hr className='font-bold border-y-green-300'/>
                        {/*create category */}
                        <h1 className='text-4xl font-bold my-4'>Create Category </h1>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" >Category Name: </label>
                            <Field
                                placeholder="T-shirt"
                                className={fieldStyle}
                                name="name"
                                type="text"
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="price" className='my-4'>category Image: </label>
                            <div className='flex my-2'>
                                <Button onPress={onOpen}  className='w-52 px-4 py-3 bg-[#180828] text-white rounded-md'>
                                    Select Category Icon
                                </Button>
                            </div>
                            <ErrorMessage name="image">
                                {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-52 px-4 py-3 bg-[#ED6533] text-white rounded-md"
                                disabled={isSubmitting}
                                onClick={() => functionAlert()}
                            >
                                Create
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/*// on press */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditProductForms;

// custom Input
function CustomInput({field, form, setFieldValue, ...props}: any) {

    const [previewImage, setPreviewImage] = useState<string | undefined>(
        undefined
    );
    const name = field.name;
    const onChange: any = (event: any) => {
        console.log("event:", event.currentTarget.files);
        const file = event.currentTarget.files[0];
        setFieldValue(name, file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <input
                type="file"
                onChange={onChange}
                {...props}
                className="border border-gray-300 rounded-md"
            />
            {previewImage && (
                <Image
                    className="rounded-md"
                    src={previewImage}
                    alt="preview Image"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
}