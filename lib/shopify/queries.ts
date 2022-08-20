import { gql } from "graphql-request";

export const GET_ALL_PRODUCTS = gql`
	query getAllProducts {
		products(first: 50) {
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
				variants(first: 50) {
					nodes {
						id
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
				}
			}
		}
	}
`;

export const PRODUCTS_BY_COLLECTION = gql`
	query AllProducts($handle: String!) {
		collection(handle: $handle) {
			products(first: 50) {
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

export const SEARCH_PRODUCT = gql`
	query searchProduct($term: String!) {
		products(first: 50, query: $term) {
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
