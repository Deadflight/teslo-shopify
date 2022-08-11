import { ShopLayout } from "components/layouts";
import { useProducts } from "hooks";
import type { NextPage, GetStaticProps } from "next";
import { GET_ALL_PRODUCTS, storeClient } from "lib";
import { IFallback, IProducts } from "interfaces";
import { FullScreenLoading } from "components/ui";
import { ProductList } from "components/products";

interface Props {
	fallback: IFallback;
}

const Home: NextPage<Props> = ({ fallback }) => {
	const { products, isLoading, isError } = useProducts("/products", {
		fallback,
	});

	// if (isError) return <div>Something went wrong</div>;

	// if (isLoading) return <div>Loading...</div>;

	return (
		<ShopLayout title="Teslo - Home" pageDescription="Teslo Home">
			<h1 className="font-semibold text-3xl md:text-4xl">Teslo Store</h1>
			<h2 className=" text-xl ">All Products</h2>
			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { products } = await storeClient.request<IProducts>(GET_ALL_PRODUCTS);
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
