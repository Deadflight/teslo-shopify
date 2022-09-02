import { gql } from "graphql-request";
import { CART_FIELDS } from "./fragments";

export const UPDATE_CARTLINES = gql`
	mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
			cart {
				...Cart
			}
			userErrors {
				field
				message
			}
		}
	}
	${CART_FIELDS}
`;

export const REMOVE_CARTLINE = gql`
	mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
			cart {
				...Cart
			}
			userErrors {
				field
				message
			}
		}
	}
	${CART_FIELDS}
`;

export const CREATE_CART = gql`
	mutation cartCreate($input: CartInput!) {
		cartCreate(input: $input) {
			cart {
				...Cart
			}
			userErrors {
				field
				message
			}
		}
	}
	${CART_FIELDS}
`;

export const ADD_CART_LINE = gql`
	mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart {
				...Cart
			}
			userErrors {
				field
				message
			}
		}
	}
	${CART_FIELDS}
`;
