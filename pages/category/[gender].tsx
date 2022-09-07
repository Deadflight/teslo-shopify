import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { ShopLayout } from "../../components/layouts";
import { sdkSWR } from "../../lib";
import Error from "next/error";
import { ProductList } from "../../components/products";

interface Props {
	gender: string;
}

const CategoryPage: NextPage<Props> = ({ gender }) => {
	const { data, error } = sdkSWR.useGetProductsByCollection(
		[`/api/products/collection?gender=${gender}`],
		{
			handle: gender,
		}
	);

	const TitlePage = gender.charAt(0).toUpperCase() + gender.slice(1);

	const productsFor =
		TitlePage === "Men" ? "him" : TitlePage === "Women" ? "her" : "kids";

	if (error || !data?.collection) {
		return (
			<ShopLayout
				title={`Teslo Shop - ${TitlePage}`}
				pageDescription={`Teslo Shop - ${TitlePage}`}
			>
				<Error statusCode={500} />;
			</ShopLayout>
		);
	}

	return (
		<ShopLayout
			title={`Teslo Shop - ${TitlePage}`}
			pageDescription={`Teslo Shop - ${TitlePage}`}
		>
			<h1 className="font-semibold text-3xl md:text-4xl">{TitlePage}</h1>
			<h2 className=" text-xl ">Products for {productsFor}</h2>
			<ProductList products={data?.collection?.products.nodes!} />
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

	const genderInitialData = await sdkSWR.getProductsByCollection({
		handle: gender,
	});

	return {
		props: {
			fallbackData: genderInitialData,
			gender,
		},
	};
};

export default CategoryPage;
