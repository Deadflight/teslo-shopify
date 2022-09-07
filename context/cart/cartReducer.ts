import { ICart, ICartProduct } from "../../interfaces";

type CartActionType =
	| {
			type: "[Cart] - LoadCart from cookies | storage";
			payload: ICartProduct[];
	  }
	| { type: "[Cart] - Empty Cart"; payload: boolean }
	| { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
	| { type: "[Cart] - Change cart quantity"; payload: ICartProduct }
	| { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
	| {
			type: "[Cart] - Update order summary";
			payload: {
				numberOfItems: number;
				subTotal: number;
				tax: number;
				total: number;
			};
	  };

export const cartReducer = (state: ICart, action: CartActionType): ICart => {
	switch (action.type) {
		case "[Cart] - LoadCart from cookies | storage":
			return {
				...state,
				isLoaded: true,
				cart: [...action.payload],
			};

		case "[Cart] - Empty Cart":
			return {
				...state,
				isCartEmpty: action.payload,
			};

		case "[Cart] - Update products in cart":
			return {
				...state,
				cart: [...action.payload],
			};

		case "[Cart] - Change cart quantity":
			return {
				...state,
				cart: state.cart.map((product) => {
					if (product.id !== action.payload.id) return product;
					if (product.variantId !== action.payload.variantId) return product;
					return action.payload;
				}),
			};

		case "[Cart] - Remove product in cart":
			return {
				...state,
				cart: state.cart.filter(
					(product) =>
						!(
							product.id === action.payload.id &&
							product.variantId === action.payload.variantId
						)
				),
			};

		case "[Cart] - Update order summary":
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
