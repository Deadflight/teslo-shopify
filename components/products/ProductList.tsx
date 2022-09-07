import { ProductFragment } from "../../lib";
import { FC } from "react";
import { ProductCard } from "./ProductCard";

interface Props {
	products: ProductFragment[];
}

export const ProductList: FC<Props> = ({ products }) => {
	return (
		<div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
};
