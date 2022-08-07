import { ShopLayout } from "@/components/layouts";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<ShopLayout title="Teslo - Home" pageDescription="Teslo Home">
			<h1>Teslo Store</h1>
			<h2>All Products</h2>
		</ShopLayout>
	);
};

export default Home;
