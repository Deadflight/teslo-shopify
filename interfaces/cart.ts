export interface ICart {
	attributes: IAtribute[];
	cost: ICost;
	checkoutUrl: string;
}

export interface IAtribute {
	key: string;
	value: string;
}

export interface ICost {}

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
