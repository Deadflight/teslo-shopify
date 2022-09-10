import { gql } from "graphql-request";

export const CART_FIELDS = gql`
	fragment Cart on Cart {
		id
		createdAt
		updatedAt
		checkoutUrl
		totalQuantity
		lines(first: 10) {
			nodes {
				id
				quantity
				cost {
					amountPerQuantity {
						amount
					}
				}
				merchandise {
					... on ProductVariant {
						image {
							altText
							url
							id
						}
						title
						id
						product {
							id
							title
						}
					}
				}
				sellingPlanAllocation {
					sellingPlan {
						id
						name
					}
					priceAdjustments {
						price {
							amount
						}
						compareAtPrice {
							amount
						}
						perDeliveryPrice {
							amount
						}
					}
				}
				attributes {
					key
					value
				}
			}
		}
		cost {
			totalAmount {
				amount
				currencyCode
			}
			subtotalAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
			totalDutyAmount {
				amount
				currencyCode
			}
		}
		attributes {
			key
			value
		}

		buyerIdentity {
			email
			phone
			customer {
				id
			}
			countryCode
		}
	}
`;
