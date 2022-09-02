export interface IOrder {
	id?: string;
	orderItems: IOrderItem[];
	paymentResult?: string;

	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	isPaid: boolean;
	paidAt?: string;

	transactionId?: string;

	createdAt?: string;
	updatedAt?: string;
}

export interface IOrderItem {
	id: string;
	title: string;
	variantId: string;
	quantity: number;
	slug: string;
	image: string;
	price: number;
	gender: string;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}
