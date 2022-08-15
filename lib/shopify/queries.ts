import { gql } from "graphql-request";

export const GET_ALL_PRODUCTS = gql`
	query getAllProducts {
		products(first: 10) {
			nodes {
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
		}
	}
`;

export const ProductsByCollection = gql`
	query AllProducts($handle: String!) {
		collection(handle: $handle) {
			products(first: 10) {
				nodes {
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
			}
		}
	}
`;
