import { ICartProduct } from "interfaces";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

interface Props {
	children: ReactNode;
}

export interface IShopifyCart {
	cartProducts: ICartProduct[];
}

const CART_INITIAL_STATE: any = {};

export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	// Efecto
	useEffect(() => {
		try {
			const cookieProducts = Cookie.get("cart")
				? JSON.parse(Cookie.get("cart")!)
				: [];
			dispatch({
				type: "[Cart] - LoadCart from cookies",
				payload: cookieProducts,
			});
		} catch (error) {
			dispatch({ type: "[Cart] - LoadCart from cookies", payload: [] });
		}
	}, []);
	return (
		<CartContext.Provider
			value={{
				...state,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
