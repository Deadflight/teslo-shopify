import { gql } from "graphql-request";
import { PRODUCT_FRAGMENT } from "./fragments";

export const GET_ALL_PRODUCTS = gql`
	query getAllProducts {
		products(first: 50) {
			nodes {
				...Product
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;

export const GET_ALL_PRODUCTS_HANDLE = gql`
	query getAllProductsHandle {
		products(first: 50) {
			nodes {
				handle
			}
		}
	}
`;

export const GET_PRODUCT_BY_HANDLE = gql`
	query getProductByHandle($handle: String!) {
		product(handle: $handle) {
			...Product
		}
	}
	${PRODUCT_FRAGMENT}
`;

export const PRODUCTS_BY_COLLECTION = gql`
	query AllProducts($handle: String!) {
		collection(handle: $handle) {
			products(first: 50) {
				nodes {
					...Product
				}
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;

export const SEARCH_PRODUCT = gql`
	query searchProduct($term: String!) {
		products(first: 50, query: $term) {
			nodes {
				...Product
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;
