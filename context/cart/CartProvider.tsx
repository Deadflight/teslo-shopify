import { ICart, ICartProduct } from "../../interfaces";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

interface Props {
	children: ReactNode;
}

const CART_INITIAL_STATE: ICart = {
	isLoaded: false,
	isCartEmpty: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	// Efecto
	useEffect(() => {
		try {
			const cookieProducts = Cookie.get("teslocart")
				? JSON.parse(Cookie.get("teslocart")!)
				: [];
			dispatch({
				type: "[Cart] - LoadCart from cookies | storage",
				payload: cookieProducts,
			});
		} catch (error) {
			dispatch({
				type: "[Cart] - LoadCart from cookies | storage",
				payload: [],
			});
		}
	}, []);

	useEffect(() => {
		if (state.isLoaded) Cookie.set("teslocart", JSON.stringify(state.cart));
	}, [state.cart, state.isLoaded]);

	useEffect(() => {
		if (!state.isLoaded) return;

		const numberOfItems = state.cart.reduce(
			(prev: number, current: ICartProduct) => current.quantity + prev,
			0
		);
		const subTotal = state.cart.reduce(
			(prev: number, current: ICartProduct) =>
				Number(current.price) * current.quantity + prev,
			0
		);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal * (taxRate + 1),
		};

		dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
	}, [state.cart, state.isLoaded]);

	useEffect(() => {
		if (state.isLoaded && !state.cart.length) {
			dispatch({ type: "[Cart] - Empty Cart", payload: true });
		} else if (state.isLoaded && state.cart.length !== 0) {
			dispatch({ type: "[Cart] - Empty Cart", payload: false });
		}
	}, [state.cart, state.isLoaded]);

	const addProductToCart = async (product: ICartProduct) => {
		const productInCart = state.cart.some(
			(p: ICartProduct) => p.id === product.id
		);

		if (!productInCart)
			return dispatch({
				type: "[Cart] - Update products in cart",
				payload: [...state.cart, product],
			});

		const productInCartButDifferentSize = state.cart.some(
			(p: ICartProduct) => p.id === product.id && p.size === product.size
		);

		if (!productInCartButDifferentSize)
			return dispatch({
				type: "[Cart] - Update products in cart",
				payload: [...state.cart, product],
			});

		// Acumulate
		const updatedProducts = state.cart.map((p: ICartProduct) => {
			if (p.id !== product.id) return p;
			if (p.size !== product.size) return p;

			// Actualizar la cantidad
			p.quantity += product.quantity;
			return p;
		});

		dispatch({
			type: "[Cart] - Update products in cart",
			payload: updatedProducts,
		});
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: "[Cart] - Change cart quantity", payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: "[Cart] - Remove product in cart", payload: product });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				// Methods
				addProductToCart,
				updateCartQuantity,
				removeCartProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
