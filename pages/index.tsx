import { ShopLayout } from "../components/layouts";
import type { NextPage, GetStaticProps } from "next";
import { ProductList } from "../components/products";
import { sdkSWR } from "../lib";
import Error from "next/error";

const Home: NextPage = ({}) => {
	const { data, error } = sdkSWR.useGetAllProducts([`/api/products`], {});

	if (error) {
		return <Error statusCode={500} />;
	}

	return (
		<ShopLayout title="Teslo - Home" pageDescription="Teslo Home">
			<h1 className="font-semibold text-3xl md:text-4xl">Teslo Store</h1>
			<h2 className=" text-xl ">All Products</h2>
			<ProductList products={data?.products.nodes!} />
		</ShopLayout>
	);
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
	const initialData = await sdkSWR.getAllProducts();

	return {
		props: {
			fallbackData: initialData,
		},
	};
};

export default Home;
