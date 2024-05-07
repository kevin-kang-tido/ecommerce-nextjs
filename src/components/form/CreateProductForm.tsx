"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import {BASE_URL} from "@/lib/constants";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import {
    useCreateProductMutation,
    useGetCategoryIconQuery,
    useGetProductsImageQuery,
    useGetProductsQuery
} from "@/redux/service/product";
import CardProductImageComponent, {imageSelect} from "@/components/card/CardProductImage";
import {useAppSelector} from "@/redux/hooks";
import {ProductPostType} from "@/lib/definitions";
import {Pagination} from "@nextui-org/react";

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



const CreateProductForm = () => {
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
     const product = useAppSelector((state)=> state.product.product)

    console.log("Current Product is : ", product);

    // Model
    const [isOpen, setIsOpen] = useState(false);
    const [currentMode, setCurrentMode] = useState('product'); // Default to 'product'

    const dataProductImage = {}; // Your data for products
    const categoryIcon = {}; // Your data for categories

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleProductClick = () => {
        setCurrentMode('product');
        handleOpen(); // Open the modal
    };

    const handleCategoryClick = () => {
        setCurrentMode('category');
        handleOpen(); // Open the modal
    };
    // End Model


    // pagiantion
    const [currentPage, setCurrentPage] = useState(1);
    // get category icon
    const {data:category,error:errorCategory,isFetching:isFetchingCategory} = useGetCategoryIconQuery({
        page:currentPage,
        pageSize:4,
    })
    console.log("This is category Data : ",category);
    // get product image
    const {data,error,isLoading,isFetching } = useGetProductsQuery({
        page:currentPage,
        pageSize:4,
    });
    // Inside your component
    useEffect(() => {
        // This will trigger a re-fetch when currentPage changes
    }, [currentPage]);
    const [createProduct,{data:dataCreateProduct,error:errorCreateProduct,isLoading:isLoadingCreateProduct}] = useCreateProductMutation();

    // pagination
    // get icon and image for redux

  const initialValues = {
        categoryName: "",
        categoryIcon: "",
        name: "",
        desc: "",
        image: "",
        price: 0,
        quantity: 0,
        fileIcon: null,
        fileProduct: null,
    };



    // handle create product

    return <div className="cotainer mx-12 pt-9">
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={async (values:any) => {
                console.log("Form Values:", values); // Log form values for debugging

                const productPost: ProductPostType = {
                    category: {
                        name: values.categoryName,
                        icon: product.category.image || '', // Ensure this matches the expected format
                    },
                    name: values.name,
                    desc: values.desc,
                    image: product.image.image || '', // Ensure this matches the expected format
                    price: values.price,
                    quantity: values.quantity,
                };

                // Attempt to create the product
                try {
                    const response = await createProduct({ newProduct: productPost }).unwrap();
                    console.log("Product created successfully:", response); // Log success response
                    alert("Create Products Successfully"); // Show success alert
                } catch (error) {
                    console.error("Error creating product:", error); // Log error details
                    alert("Failed to create product. Please try again."); // Show error alert
                }
            }}

        >
                <Form className="flex m-[30px] flex-col gap-4">
                    <h1 className='text-4xl font-bold my-4'>Create Product </h1>
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
                        {/*// Preview Image selected?*/}
                        <div className='flex my-2'>
                           <Image width={200} height={200}  src={product.image?.image}  alt={'selected'}/>
                        </div>
                        <div className=''>
                            <label htmlFor="price" className='my-4 text-2xl'>Product Image: </label>
                            <div className='flex my-2'>
                                <Button  onPress={handleProductClick} className='w-52 px-4 py-3 bg-[#180828] text-white rounded-md'>
                                    Select Product Icon
                                </Button>
                            </div>
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
                            name="categoryName"
                            type="text"
                        />
                    </div>
                    {/*// Preview Image selected?*/}
                    <div className='flex my-2'>
                        <Image width={200} height={200}  src={product.category?.image}  alt={'selected'}/>
                    </div>
                    <div className=''>
                        <label htmlFor="price" className='my-4'>category Image: </label>
                        <div className='flex my-2'>
                            <Button onPress={handleCategoryClick}  className='w-52 px-4 py-3 bg-[#180828] text-white rounded-md'>
                                Select Category Icon
                            </Button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-52 px-4 py-3 bg-[#ED6533] text-white rounded-md"
                            // onClick={() => functionAlert()}
                        >
                            Create Product
                        </button>
                    </div>
                </Form>
        </Formik>
        {/*// on press */}
        <Modal  isOpen={isOpen} onOpenChange={handleClose}>
            <ModalContent>
                {(onClose) => <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            {currentMode === 'product' && (
                                data.results?.map((dataProductImage:imageSelect,index:number) => (
                                    <CardProductImageComponent
                                        key={index}
                                        id={dataProductImage.id}
                                        name={dataProductImage.name}
                                        image={dataProductImage.image}
                                        type ="product"
                                    />
                                ))
                            )}
                            {currentMode === 'category' && (
                                category.results?.map((categoryImage:imageSelect,index:number) => (
                                    <CardProductImageComponent
                                        key={index}
                                        id={categoryImage.id}
                                        name={categoryImage.name}
                                        image={categoryImage.image}
                                        type="category"
                                    />

                                ))
                            )}

                            <div className="flex overflow-x-auto sm:justify-center my-8">
                                <Pagination
                                    isCompact
                                    showControls
                                    total={10}
                                    initialPage={1}
                                    onChange={(newPage) => setCurrentPage(newPage)}
                                />
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>}
            </ModalContent>
        </Modal>
    </div>;
};

export default CreateProductForm;



