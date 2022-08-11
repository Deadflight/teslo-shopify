import { GraphQLClient } from "graphql-request";

// Load the access token as per instructions above
const storefrontAccessToken =
	process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN || "";

// Shop from which we're fetching data  https://{store_name}.myshopify.com/api/2022-07/graphql.json
const shop =
	`https://${process.env.SHOPIFY_STORE_DOMAIN}/${process.env.SHOPIFY_API_VERSION}` ||
	"";

export const storeClient = new GraphQLClient(shop, {
	headers: {
		"Content-Type": "application/json",
		"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
	},
});
