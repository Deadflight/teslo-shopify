import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { NextPage, GetServerSideProps } from "next";
import Error from "next/error";
import { sdkSWR } from "../../lib/shopify/client";

interface Props {
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({ foundProducts, query }) => {
	const { data, error } = sdkSWR.useSearchProduct(
		[`/api/products/search?query=${query}`],
		{
			term: query,
		}
	);

	if (error || !data) {
		return <Error statusCode={500} />;
	}

	return (
		<ShopLayout
			title={"Teslo Shop - Search"}
			pageDescription={"Teslo Shop Search Page"}
		>
			<h1 className="font-semibold text-3xl md:text-4xl">Search products</h1>
			{foundProducts ? (
				<h2 className={"capitalize text-2xl md:text-3xl mb-2"}>
					Term: {query}
				</h2>
			) : (
				<h2 className={"capitalize text-2xl md:text-3xl mb-2"}>
					No products found: {query}
				</h2>
			)}

			<ProductList products={data?.products?.nodes} />
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = "" } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: "/",
				permanent: true,
			},
		};
	}

	const searchedProducts = await sdkSWR.searchProduct({
		term: query,
	});

	if (!searchedProducts.products.nodes.length) {
		const allProducts = await sdkSWR.getAllProducts();

		return {
			props: {
				fallbackData: allProducts,
				foundProducts: false,
				query,
			},
		};
	}

	return {
		props: {
			fallbackData: searchedProducts,
			foundProducts: true,
			query,
		},
	};
};

export default SearchPage;
