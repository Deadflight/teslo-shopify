import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

interface Props {
	orderValues?: {
		numberOfItems: number;
		subTotal: number;
		total: number;
		tax: number;
	};
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
	const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

	const summaryValues = orderValues
		? orderValues
		: { numberOfItems, subTotal, total, tax };

	return (
		<article className="shadow-md rounded-[10px] border p-4">
			<h4 className="">Order</h4>
			<hr className="my-2 border-b" />
			<div className="flex justify-between">
				<p>No. Products</p>
				<p>
					{numberOfItems} {numberOfItems > 1 ? "products" : "product"}
				</p>
			</div>
			<div className="flex justify-between">
				<p>SubTotal</p>
				<p>{currency.format(summaryValues.subTotal)}</p>
			</div>
			<div className="flex justify-between">
				<p>Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</p>
				<p>{currency.format(summaryValues.tax)}</p>
			</div>
			<div className="flex justify-between font-semibold text-lg mt-2">
				<strong>Total</strong>
				<strong>{currency.format(summaryValues.total)}</strong>
			</div>
			<button
				className="w-full bg-blue-600 rounded-[10px] text-white text-sm py-1 px-2 font-medium hover:bg-blue-700 duration-300 mt-6"
				aria-label="Checkout Button"
			>
				Checkout
			</button>
		</article>
	);
};
