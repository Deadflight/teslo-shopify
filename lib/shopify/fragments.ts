import { gql } from "graphql-request";

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
		sellingPlanGroups(first: 10) {
			nodes {
				appName
				name
				sellingPlans(first: 10) {
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
		variants(first: 10) {
			nodes {
				id
				sellingPlanAllocations(first: 10) {
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
		}
	}
`;
