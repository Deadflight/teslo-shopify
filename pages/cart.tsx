import { CartList, OrderSummary } from "../components/cart";
import { ShopLayout } from "../components/layouts";
import { CartContext } from "../context";
import { useContext } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";

const Cart = () => {
	const { isCartEmpty } = useContext(CartContext);

	return (
		<ShopLayout
			title={"Teslo Shop - Cart"}
			pageDescription={"Teslo Shop - Cart"}
		>
			<h1 className="text-3xl font-semibold">Cart</h1>
			{!isCartEmpty ? (
				<>
					<section className="w-full flex flex-col md:flex-row md:space-x-4">
						<div className="w-full md:w-[60%]">
							<CartList editable />
						</div>
						<div className="w-full md:w-[40%]">
							<OrderSummary />
						</div>
					</section>
				</>
			) : (
				<section className="w-full flex flex-col items-center h-[calc(100vh-200px)] justify-center md:flex-row">
					<MdOutlineRemoveShoppingCart size={100} />
					<div className="flex flex-col items-center">
						<h2>You cart is empty</h2>
						<Link href={"/"} passHref>
							<a className={"text-4xl text-blue-600"}>Home</a>
						</Link>
					</div>
				</section>
			)}
		</ShopLayout>
	);
};

export default Cart;
