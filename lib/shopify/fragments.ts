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
