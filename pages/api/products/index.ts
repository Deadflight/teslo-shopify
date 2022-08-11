import type { NextApiRequest, NextApiResponse } from "next";
import { GET_ALL_PRODUCTS, storeClient } from "../../../lib";
import { IProducts } from "../../../interfaces";

type Data = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getAllProducts(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const getAllProducts = async (req: NextApiRequest, res: NextApiResponse) => {
	const { products } = await storeClient.request<IProducts>(GET_ALL_PRODUCTS);
	const { nodes } = products;
	return res.status(200).json(nodes);
};
