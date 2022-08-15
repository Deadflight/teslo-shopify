import { IProduct } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { currency } from "utils";

interface Props {
	product: IProduct;
}
export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);

	const productImage = useMemo(
		() => (isHovered ? product.images.nodes[1] : product.images.nodes[0]),
		[isHovered, product.images]
	);
	return (
		<Link
			href={`/product/${product.handle}`}
			passHref
			className="flex flex-col"
		>
			<a className="space-y-1">
				<div
					className="shadow-productImage"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Image
						src={productImage.url}
						alt={product.featuredImage.altText || product.description}
						layout="responsive"
						width={400}
						height={400}
						priority
						placeholder="blur"
						blurDataURL={product.featuredImage.url}
						style={{
							borderRadius: "10px",
						}}
					/>
				</div>
				<p className="font-bold">{product.title}</p>
				<p className="font-medium">
					{currency.format(Number(product.priceRange.maxVariantPrice.amount))}
				</p>
			</a>
		</Link>
	);
};
