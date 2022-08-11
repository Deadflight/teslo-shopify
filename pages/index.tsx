import { ShopLayout } from "@/components/layouts";
import { useProducts } from "hooks";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { GET_ALL_PRODUCTS, storeClient } from "lib/shopify";
import useSWR, { unstable_serialize, SWRConfig } from "swr";

interface Props {
	fallback: any;
}

const fetcher = (resource: any, init: any) =>
	fetch(resource, init).then((res) => res.json());

const Home: NextPage<Props> = ({ fallback }) => {
	const { data, error } = useSWR("/api/products", fetcher, {
		fallback,
	});

	return (
		<SWRConfig
			value={{
				fallback,
			}}
		>
			<ShopLayout title="Teslo - Home" pageDescription="Teslo Home">
				<h1 className="font-semibold text-3xl md:text-5xl">Teslo Store</h1>
				<h2 className=" text-xl ">All Products</h2>
				{data.map((product: any) => (
					<h3 key={product.title}>{product.title}</h3>
				))}
			</ShopLayout>
		</SWRConfig>
	);
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { products } = await storeClient.request(GET_ALL_PRODUCTS);
	const { nodes } = products;

	return {
		props: {
			fallback: {
				"/api/products": nodes,
			},
		},
	};
};

export default Home;
