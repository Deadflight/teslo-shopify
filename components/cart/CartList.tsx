import { ICartProduct } from "interfaces";
import { FC, useContext } from "react";
import { CartContext } from "context/cart";
import Link from "next/link";
import Image from "next/image";
import { ItemCounter } from "components/ui";
import { currency } from "utils";

interface Props {
	products?: ICartProduct[];
	editable?: boolean;
}
export const CartList: FC<Props> = ({ products, editable = false }) => {
	const { cart, updateCartQuantity, removeCartProduct } =
		useContext(CartContext);

	const onNewCartQuantityValue = (
		product: ICartProduct,
		newQuantityValue: number
	) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	};

	const productsToShow = products ? products : cart;

	return (
		<>
			{productsToShow.map((product) => (
				<article
					key={product.size + product.slug}
					className="space-y-2 mb-4 flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0"
				>
					<Link href={`/product/${product.slug}`} passHref>
						<a className="w-full md:w-1/2">
							<Image
								src={product.image}
								alt={product.image || "Teslo Product Image"}
								layout="responsive"
								width={400}
								height={400}
								quality={100}
								priority
							/>
						</a>
					</Link>
					<div className="w-full flex space-x-2 md:w-1/2">
						<div className="flex flex-col w-[80%]">
							<h2>{product.title}</h2>
							<h2>
								Size: <strong>{product.size}</strong>
							</h2>
							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updatedQuantity={(value) =>
										onNewCartQuantityValue(product as ICartProduct, value)
									}
								/>
							) : (
								<h3>
									{product.quantity}{" "}
									{product.quantity > 1 ? "products" : "product"}
								</h3>
							)}
						</div>
						<div className="flex flex-col items-center w-[20%]">
							<h3 className="font-semibold text-lg">
								{currency.format(Number(product.price))}
							</h3>
							{editable && (
								<button
									className="btn-animated p-2 text-blue-600 text-sm font-medium"
									onClick={() => removeCartProduct(product)}
								>
									Remove
								</button>
							)}
						</div>
					</div>
				</article>
			))}
		</>
	);
};
