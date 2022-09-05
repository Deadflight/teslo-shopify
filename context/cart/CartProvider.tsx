import { ICart, ICartProduct } from "interfaces";
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

// const CART_INITIAL_STATE: Cart = {
//   // __typename?: 'Cart';
//   /** An attribute associated with the cart. */
//   // attribute?: Maybe<Attribute>;
//   /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
//   attributes: [],
//   /** Information about the buyer that is interacting with the cart. */
//   buyerIdentity: {},
//   /** The URL of the checkout for the cart. */
//   checkoutUrl: '',
//   /** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/api/examples/international-pricing#create-a-cart). */
//   cost: {
// 		checkoutChargeAmount: {
// 			amount: '',
// 			currencyCode: {
// 				  Aed: 'AED',
//   /** Afghan Afghani (AFN). */
//   Afn: 'AFN',
//   /** Albanian Lek (ALL). */
//   All:'ALL',
//   /** Armenian Dram (AMD). */
//   Amd: 'AMD',
//   /** Netherlands Antillean Guilder. */
//   Ang: 'ANG',
//   /** Angolan Kwanza (AOA). */
//   Aoa: 'AOA',
//   /** Argentine Pesos (ARS). */
//   Ars: 'ARS',
//   /** Australian Dollars (AUD). */
//   Aud: 'AUD',
//   /** Aruban Florin (AWG). */
//   Awg: 'AWG',
//   /** Azerbaijani Manat (AZN). */
//   Azn: 'AZN',
//   /** Bosnia and Herzegovina Convertible Mark (BAM). */
//   Bam: 'BAM',
//   /** Barbadian Dollar (BBD). */
//   Bbd: 'BBD',
//   /** Bangladesh Taka (BDT). */
//   Bdt: 'BDT',
//   /** Bulgarian Lev (BGN). */
//   Bgn: 'BGN',
//   /** Bahraini Dinar (BHD). */
//   Bhd: 'BHD',
//   /** Burundian Franc (BIF). */
//   Bif: 'BIF',
//   /** Bermudian Dollar (BMD). */
//   Bmd: 'BMD',
//   /** Brunei Dollar (BND). */
//   Bnd: 'BND',
//   /** Bolivian Boliviano (BOB). */
//   Bob: 'BOB',
//   /** Brazilian Real (BRL). */
//   Brl: 'BRL',
//   /** Bahamian Dollar (BSD). */
//   Bsd: 'BSD',
//   /** Bhutanese Ngultrum (BTN). */
//   Btn: 'BTN',
//   /** Botswana Pula (BWP). */
//   Bwp: 'BWP',
//   /** Belarusian Ruble (BYN). */
//   Byn: 'BYN',
// 			},
// 		},
// 		subtotalAmount: {
// 			amount: '',
// 			currencyCode: ,
// 		},
// 		subtotalAmountEstimated: false,
// 		totalAmount: {
// 			amount: '',
// 			currencyCode: ''
// 		}
// 	},
//   /** The date and time when the cart was created. */
//   createdAt: "",
//   /** The delivery groups available for the cart, based on the default address of the logged-in customer. */
//   deliveryGroups: {
// 		edges: [],
// 		nodes: [],
// 		pageInfo: {
// 			hasNextPage: false,
// 			hasPreviousPage: false,
// 		}
// 	},
//   /** The discounts that have been applied to the entire cart. */
//   discountAllocations: [],
//   /**
//    * The case-insensitive discount codes that the customer added at checkout.
//    *
//    */
//   discountCodes: [],
//   /**
//    * The estimated costs that the buyer will pay at checkout. The estimated costs are subject to change and changes will be reflected at checkout. The `estimatedCost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/api/examples/international-pricing#create-a-cart).
//    * @deprecated Use `cost` instead
//    */
//   // estimatedCost: CartEstimatedCost;
//   /** A globally-unique identifier. */
//   id: '',
//   /** A list of lines containing information about the items the customer intends to purchase. */
//   lines: {
// 		edges: [],
// 		nodes: [],
// 		pageInfo: {
// 			hasNextPage: false,
// 			hasPreviousPage: false,
// 		}
// 	},
//   /** A note that is associated with the cart. For example, the note can be a personalized message to the buyer. */
//   // note?: Maybe<Scalars['String']>;
//   /** The total number of items in the cart. */
//   totalQuantity: 0,
//   /** The date and time when the cart was updated. */
//   updatedAt: '',
// };

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
			(prev, current) => current.quantity + prev,
			0
		);
		const subTotal = state.cart.reduce(
			(prev, current) => Number(current.price) * current.quantity + prev,
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
		const productInCart = state.cart.some((p) => p.id === product.id);

		if (!productInCart)
			return dispatch({
				type: "[Cart] - Update products in cart",
				payload: [...state.cart, product],
			});

		const productInCartButDifferentSize = state.cart.some(
			(p) => p.id === product.id && p.size === product.size
		);

		if (!productInCartButDifferentSize)
			return dispatch({
				type: "[Cart] - Update products in cart",
				payload: [...state.cart, product],
			});

		// Acumulate
		const updatedProducts = state.cart.map((p) => {
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
