import { ProductVariantFragment } from "lib";
import { FC } from "react";

interface Props {
	selectedSize?: string;
	variantSizes: ProductVariantFragment[];

	// Method
	onSelectedSize: (size: ProductVariantFragment) => void;
}

export const SizeSelector: FC<Props> = ({
	variantSizes,
	selectedSize,
	onSelectedSize,
}) => {
	return (
		<div className="flex space-x-1">
			{variantSizes.map((variantSize) => (
				<button
					key={variantSize.id}
					className={`${
						selectedSize === variantSize.title
							? "bg-neutral-900 text-white"
							: "bg-white hover:bg-gray-200 transition-all duration-500"
					} px-[10px] py-[4px] w-16 rounded-[10px] cursor-pointer text-sm`}
					onClick={() => onSelectedSize(variantSize)}
				>
					{variantSize.title}
				</button>
			))}
		</div>
	);
};
