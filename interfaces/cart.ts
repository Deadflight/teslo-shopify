export interface ICart {
	isLoaded: boolean;
	isCartEmpty: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
}

export interface ICartProduct {
	id: string;
	image: string;
	slug: string;
	title: string;
	quantity: number;
	price: string;
	size: string;
	variantId: string;
	availableForSale: boolean | null;
	quantityAvailable: number;
}
