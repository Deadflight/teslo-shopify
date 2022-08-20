import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { useProducts } from "hooks";
import { IFallback, IProducts } from "interfaces";
import { storeClient, SearchProduct, GET_ALL_PRODUCTS } from "lib";
import { NextPage, GetServerSideProps } from "next";

interface Props {
	fallback: IFallback;
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({ fallback, foundProducts, query }) => {
	const { products, isError, isLoading } = useProducts(
		`/products/search?query=${query}`,
		fallback
	);

	return (
		<ShopLayout
			title={"Teslo Shop - Search"}
			pageDescription={"Teslo Shop - Search Page"}
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

			<ProductList products={products} />
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

	//Query without spaces
	const { products } = await storeClient.request<IProducts>(SearchProduct, {
		term: `title:${query}*`,
	});

	if (!products.nodes.length) {
		const { products } = await storeClient.request<IProducts>(GET_ALL_PRODUCTS);
		const { nodes } = products;

		return {
			props: {
				fallback: {
					[`/api/products/search?query=${query}`]: nodes,
				},
				foundProducts: false,
				query,
			},
		};
	}

	const { nodes } = products;

	return {
		props: {
			fallback: {
				[`/api/products/search?query=${query}`]: nodes,
			},
			foundProducts: true,
			query,
		},
	};
};

export default SearchPage;
