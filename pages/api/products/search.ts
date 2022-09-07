import type { NextApiRequest, NextApiResponse } from "next";
import { GetAllProductsQuery, sdkSWR } from "../../../lib";

type Data = { message: string } | GetAllProductsQuery;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return searchProduct(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const searchProduct = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { query = "" } = req.query as { query: string };

	const searchedProducts = await sdkSWR.searchProduct({
		term: query,
	});

	if (!searchedProducts.products.nodes.length) {
		const allProducts = await sdkSWR.getAllProducts();
		return res.status(200).json(allProducts);
	}

	return res.status(200).json(searchedProducts);
};
