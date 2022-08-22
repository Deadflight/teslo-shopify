import { gql } from "graphql-request";

export const PRODUCT_VARIANT_FRAGMENT = gql`
	fragment ProductVariant on ProductVariant {
		id
		availableForSale
		title
		quantityAvailable
		sellingPlanAllocations(first: 50) {
			nodes {
				checkoutChargeAmount {
					amount
				}
				sellingPlan {
					name
					id
				}
				remainingBalanceChargeAmount {
					amount
				}
				priceAdjustments {
					compareAtPrice {
						amount
					}
					perDeliveryPrice {
						amount
					}
					price {
						amount
					}
					unitPrice {
						amount
					}
				}
			}
		}
		priceV2 {
			amount
		}
	}
`;

export const PRODUCT_FRAGMENT = gql`
	fragment Product on Product {
		availableForSale
		title
		handle
		id
		priceRange {
			maxVariantPrice {
				amount
			}
		}
		description
		featuredImage {
			url
			altText
		}
		images(first: 2) {
			nodes {
				url
				altText
			}
		}
		sellingPlanGroups(first: 50) {
			nodes {
				appName
				name
				sellingPlans(first: 50) {
					nodes {
						name
						id
						description
					}
				}
				options {
					name
					values
				}
			}
		}
		seo {
			description
			title
		}
		variants(first: 50) {
			nodes {
				...ProductVariant
			}
		}
	}
	${PRODUCT_VARIANT_FRAGMENT}
`;

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
