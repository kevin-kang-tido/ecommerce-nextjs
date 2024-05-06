
export type ProductType = {
    id:number,
    category:string,
    name:string,
    price:number,
    image:string,
    onClick?: () => void;
}

export type CartProductType = {
	title: string;
	image: string;
	price: number;
	id: number;
	onClick?: () => void;
};

export type CreateProductType = {
    id:number,
    category:string,
    name:string,
    price:number,
    image:string,
    quantity: number;
}

export type ProductTypeCreate = {
    category: {
        name: string,
        icon:string,
    },
    name: string,
    desc: string,
    image: undefined,
    price:null,
    quantity: null,
}
export type CatageoryType = {
    name: string;
    icon: string;
};

export type ProductPostType = {
    category: CatageoryType;
    name: string;
    desc: string;
    image: string;
    price: number;
    quantity: number;
};