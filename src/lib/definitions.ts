
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
