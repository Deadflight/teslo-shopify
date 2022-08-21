import { ProductList } from "components/products";
import { FullScreenLoading } from "components/ui";
import { useProducts } from "hooks";
import { ICollection, IFallback } from "interfaces";
import { PRODUCTS_BY_COLLECTION, storeClient } from "lib";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { ShopLayout } from "components/layouts";

interface Props {
	fallback: IFallback;
	gender: string;
}

const CategoryPage: NextPage<Props> = ({ fallback, gender }) => {
	const { products, isError, isLoading } = useProducts(
		`/products/collection?gender=${gender}`,
		fallback
	);

	const TitlePage = gender.charAt(0).toUpperCase() + gender.slice(1);

	const productsFor =
		TitlePage === "Men" ? "him" : TitlePage === "Women" ? "her" : "kids";

	return (
		<ShopLayout
			title={`Teslo Shop - ${TitlePage}`}
			pageDescription={`Teslo Shop - ${TitlePage}`}
		>
			<h1 className="font-semibold text-3xl md:text-4xl">{TitlePage}</h1>
			<h2 className=" text-xl ">Products for {productsFor}</h2>
			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = [
		{
			gender: "men",
		},
		{
			gender: "women",
		},
		{
			gender: "kids",
		},
	];

	return {
		paths: categories.map(({ gender }) => ({
			params: {
				gender,
			},
		})),
		fallback: false,
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { gender } = params as { gender: string };

	// By default shopify add '-collection' to the end of the collection name
	// const collectionName = gender + "-collection";

	const { collection } = await storeClient.request<ICollection>(
		PRODUCTS_BY_COLLECTION,
		{
			handle: gender,
		}
	);

	const { products } = collection;
	const { nodes } = products;

	return {
		props: {
			fallback: {
				[`/api/products/collection?gender=${gender}`]: nodes,
			},
			gender,
		},
	};
};

export default CategoryPage;
