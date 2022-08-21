import { gql } from "graphql-request";
export const CREATE_CART = gql`
	mutation cartCreate($input: CartInput!) {
		cartCreate(input: $input) {
			cart {
				id
				createdAt
				updatedAt
				lines(first: 50) {
					edges {
						node {
							id
							merchandise {
								... on ProductVariant {
									id
								}
							}
						}
					}
				}
				attributes {
					key
					value
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
			}
		}
	}
`;
