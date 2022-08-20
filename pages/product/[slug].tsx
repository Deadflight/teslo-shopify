import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ShopLayout } from "components/layouts";
import { GET_ALL_PRODUCTS_HANDLE, storeClient } from "lib";
import { IProducts } from "interfaces";
import { GET_PRODUCT_BY_HANDLE } from "../../lib/shopify/queries";
import { IProductHandle } from "../../interfaces/product";

interface Props {
	product: IProductHandle;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	console.log(product);
	return (
		<ShopLayout
			title={"Teslo - ProductPage"}
			pageDescription={"Teslo - ProductPage"}
		>
			<p>Product</p>
		</ShopLayout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
	const { products } = await storeClient.request<IProducts>(
		GET_ALL_PRODUCTS_HANDLE
	);
	const { nodes } = products;

	const paths = nodes.map((product) => ({
		params: {
			slug: product.handle,
		},
	}));
	return {
		paths,
		fallback: "blocking",
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };

	const { product } = await storeClient.request<IProductHandle>(
		GET_PRODUCT_BY_HANDLE,
		{
			handle: slug,
		}
	);

	if (!product) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
	};
};

export default ProductPage;
