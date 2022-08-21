import { VariantsNode } from "./product";

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
