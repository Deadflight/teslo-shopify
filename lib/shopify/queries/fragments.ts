import { gql } from "graphql-request";

export const SEO_FIELDS = gql`
	fragment SEO on SEO {
		description
		title
	}
`;

export const PRODUCT_OPTION_FIELDS = gql`
	fragment ProductOption on ProductOption {
		id
		name
		values
	}
`;

export const METAFIELD_FIELDS = gql`
	fragment Metafield on Metafield {
		createdAt
		description
		id
		key
		namespace
		parentResource {
			__typename
		}
		reference {
			__typename
		}
		type
		updatedAt
		value
	}
`;

export const IMAGE_FIELDS = gql`
	fragment Image on Image {
		altText
		height
		id
		url
		width
	}
`;

export const PRODUCT_PRICE_RANGE_FIELDS = gql`
	fragment ProductPriceRange on ProductPriceRange {
		maxVariantPrice {
			amount
			currencyCode
		}
		minVariantPrice {
			amount
			currencyCode
		}
	}
`;

export const PRODUCT_VARIANT_FIELDS = gql`
	fragment ProductVariant on ProductVariant {
		availableForSale
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

export const PRODUCT_FIELDS = gql`
	fragment Product on Product {
		availableForSale
		compareAtPriceRange {
			...ProductPriceRange
		}
		createdAt
		description
		descriptionHtml
		featuredImage {
			...Image
		}
		handle
		id
		metafields(identifiers: []) {
			...Metafield
		}
		onlineStoreUrl
		options(first: 50) {
			...ProductOption
		}
		priceRange {
			...ProductPriceRange
		}
		productType
		publishedAt
		requiresSellingPlan
		seo {
			...SEO
		}
		tags
		title
		totalInventory
		updatedAt
		vendor
		images(first: 5) {
			nodes {
				...Image
			}
		}
		variants(first: 50) {
			nodes {
				...ProductVariant
			}
		}
	}
	${PRODUCT_VARIANT_FIELDS}
	${PRODUCT_PRICE_RANGE_FIELDS}
	${IMAGE_FIELDS}
	${METAFIELD_FIELDS}
	${PRODUCT_OPTION_FIELDS}
	${SEO_FIELDS}
`;

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
