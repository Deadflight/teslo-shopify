import type { NextApiRequest, NextApiResponse } from "next";
import { GET_ALL_PRODUCTS, storeClient } from "../../../lib";
import { IProduct, IProducts } from "../../../interfaces";

type Data =
	| {
			message: string;
	  }
	| IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProducts(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { products } = await storeClient.request<IProducts>(GET_ALL_PRODUCTS);
	const { nodes } = products;
	return res.status(200).json(nodes);
};
