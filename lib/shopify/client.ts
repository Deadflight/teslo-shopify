import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "./generated";

// Load the access token as per instructions above
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN || "";

const adminAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN || "";

// Shop from which we're fetching data  https://{store_name}.myshopify.com/api/2022-07/graphql.json
const shop =
	`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}` ||
	"";

export const storeClient = new GraphQLClient(shop, {
	headers: {
		"Content-Type": "application/json",
		"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
	},
});

const adminShopURL =
	`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}` ||
	"";

export const adminClient = new GraphQLClient(adminShopURL, {
	headers: {
		"Content-Type": "application/json",
		"X-Shopify-Access-Token": adminAccessToken,
	},
});

export const sdkSWR = getSdkWithHooks(storeClient);

export const sdkAdminSWR = getSdkWithHooks(adminClient);
