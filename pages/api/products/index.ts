import type { NextApiRequest, NextApiResponse } from "next";
import { GetAllProductsQuery, sdkSWR } from "lib";

type Data =
	| {
			message: string;
	  }
	| GetAllProductsQuery;

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
	const products = await sdkSWR.getAllProducts();

	return res.status(200).json(products);
};
