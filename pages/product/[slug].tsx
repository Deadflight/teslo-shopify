import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ShopLayout } from "components/layouts";
import {
	GET_ALL_PRODUCTS_HANDLE,
	storeClient,
	GET_PRODUCT_BY_HANDLE,
} from "lib";
import {
	IFallback,
	IProducts,
	IProductHandle,
	ICartProduct,
	VariantsNode,
} from "interfaces";
import { useProduct } from "hooks";
import { ProductSlider, SizeSelector } from "components/products";
import { currency } from "utils";
import { ItemCounter } from "components/ui";
import { useState } from "react";

interface Props {
	fallback: IFallback;
	slug: string;
}

const ProductPage: NextPage<Props> = ({ fallback, slug }) => {
	const { product, isError, isLoading } = useProduct(
		`/products/slug?slug=${slug}`,
		fallback
	);

	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		id: product.id,
		image: product.images.nodes[0].url,
		slug: product.handle,
		title: product.title,
		quantity: 1,
		price: "",
		size: "",
		variantId: "",
		availableForSale: null,
		quantityAvailable: 0,
	});

	console.log("tempCartProduct", tempCartProduct);

	const onUpdateQuantity = (newValue: number) => {
		if (!tempCartProduct.size) return;

		setTempCartProduct((currentProduct: ICartProduct) => ({
			...currentProduct,
			quantity: newValue,
		}));
	};

	const selectedSize = (variantSizes: VariantsNode) => {
		setTempCartProduct((currentProduct: any) => ({
			...currentProduct,
			size: variantSizes.title,
			variantId: variantSizes.id,
			quantityAvailable: variantSizes.quantityAvailable,
			quantity: 1,
			availableForSale: variantSizes.availableForSale,
		}));
	};

	const onAddProductToCart = () => {
		if (!tempCartProduct.size) return;
		alert("Product added to cart");
	};

	return (
		<ShopLayout
			title={"Teslo - ProductPage"}
			pageDescription={"Teslo - ProductPage"}
		>
			<section className="flex py-3 w-full flex-col gap-8 md:flex-row">
				<div className="w-full md:w-[57%]">
					<ProductSlider images={product.images} />
				</div>
				<article className="w-full md:w-[calc(43%-32px)]">
					<h1 className="text-3xl font-semibold">{product.title}</h1>
					<h2 className="text-lg font-semibold">
						{currency.format(Number(product.priceRange.maxVariantPrice.amount))}
					</h2>

					<div className="space-y-3 mt-6">
						<span className=" font-medium text-sm">Quantity</span>
						<ItemCounter
							currentValue={tempCartProduct.quantity}
							updatedQuantity={onUpdateQuantity}
							maxValue={
								tempCartProduct.quantityAvailable > 10
									? 10
									: tempCartProduct.quantityAvailable
							}
						/>
						<SizeSelector
							variantSizes={product.variants.nodes}
							selectedSize={tempCartProduct.size}
							onSelectedSize={selectedSize}
						/>
						<button
							className={
								"bg-blue-600 text-white hover:bg-blue-800 transition duration-500 w-full rounded-[10px] py-[4px] px-[10px] font-medium text-sm disabled:bg-transparent disabled:transition-none disabled:text-red-500 disabled:border disabled:border-red-500 disabled:rounded-[16px] disabled:cursor-default"
							}
							disabled={
								!product.availableForSale ||
								tempCartProduct.availableForSale === false
							}
							onClick={onAddProductToCart}
						>
							{product.availableForSale
								? !tempCartProduct.size.length
									? "Select a size"
									: !tempCartProduct.availableForSale
									? "Out of stock"
									: "Add to cart"
								: "Out of stock"}
						</button>
					</div>
				</article>
			</section>
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
			fallback: {
				[`/api/products/slug?slug=${slug}`]: product,
			},
			slug,
		},
	};
};

export default ProductPage;
