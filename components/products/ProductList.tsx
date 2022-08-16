import { FC } from "react";
import { IProduct } from "../../interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
	products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
	console.log(products);
	return (
		<div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
};
