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
    Pagination
} from "@nextui-org/react";
import {useGetCategoryIconQuery, useGetProductsImageQuery, useGetProductsQuery} from "@/redux/service/ecommerce";
import CardProductImageComponent, {imageSelect} from "@/components/card/CardProductImage";
import {useAppSelector} from "@/redux/hooks";


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
    const onPageChange = (page: number) => setCurrentPage(page);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [products,setProducts] = useState([]);


    // get category icon
    const {data:category,error:errorCategory,isFetching:isFetchingCategory} = useGetCategoryIconQuery({
        page:1,
        pageSide:5,
    })
    console.log("This is category Data : ",category);
    // get product image
    const {data,error,isLoading,isFetching } = useGetProductsQuery({
        page:1,
        pageSide:5,
    });
    console.log("This is Image Product: ",data);
    console.log("error", error);
    console.log("isLoading", isLoading);

    // pagination
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/file/product/?page=${currentPage}&page_size=10`);
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
    // get icon and image for redux



    // handle create product
    const handleCreteProduct = () => {

    }





    return (
        <div className="cotainer mx-12 pt-9">
            <Formik
                onSubmit={() => {

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
                                name="name"
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
                                onClick={() => functionAlert()}
                            >
                                Create
                            </button>
                        </div>
                    </Form>
            </Formik>

            {/*// on press */}
            <Modal  isOpen={isOpen} onOpenChange={handleClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                {currentMode === 'product' && (
                                    data.results?.map((dataProductImage:imageSelect) => (
                                        <CardProductImageComponent
                                            id={dataProductImage.id}
                                            name={dataProductImage.name}
                                            image={dataProductImage.image}
                                            type ="product"
                                        />
                                    ))
                                )}
                                {currentMode === 'category' && (
                                    category.results?.map((categoryImage:imageSelect) => (
                                        <CardProductImageComponent
                                            id={categoryImage.id}
                                            name={categoryImage.name}
                                            image={categoryImage.image}
                                            type="category"
                                        />

                                    ))
                                )}

                                <div className="flex overflow-x-auto sm:justify-center my-8">
                                    <Pagination isCompact showControls total={totalPages} initialPage={1}
                                                page={currentPage}
                                                onChange={onPageChange}/>
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
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateProductForm;



