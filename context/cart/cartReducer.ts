import { CartState } from "./";

type CartActionType = {
	type: "[Cart] - LoadCart from cookies";
	payload: IShopifyCart;
};

export const cartReducer = (state: CartState, action: CartActionType) => {
	switch (action.type) {
		case "[Cart] - LoadCart from cookies":
			return {
				...state,
				isLoaded: true,
				cart: [...action.payload],
			};
		default:
			return state;
	}
};
