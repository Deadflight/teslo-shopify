import { IProduct, IProducts } from "interfaces";
import { GET_ALL_PRODUCTS, SEARCH_PRODUCT, storeClient } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

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

	//Query without spaces
	const { products } = await storeClient.request<IProducts>(SEARCH_PRODUCT, {
		term: `title:${query}*`,
	});

	if (!products.nodes.length) {
		const { products } = await storeClient.request<IProducts>(GET_ALL_PRODUCTS);
		const { nodes } = products;

		return res.status(200).json(nodes);
	}

	const { nodes } = products;

	return res.status(200).json(nodes);
};
