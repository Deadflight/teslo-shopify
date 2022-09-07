import type { NextApiRequest, NextApiResponse } from "next";
import { GetProductByHandleQuery, sdkSWR } from "../../../lib";

type Data =
	| {
			message: string;
	  }
	| GetProductByHandleQuery;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProduct(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { slug = "" } = req.query as { slug: string };

	const product = await sdkSWR.getProductByHandle({
		handle: slug,
	});

	if (!product)
		return res.status(404).json({ message: `Product Not Found: ${slug}` });

	return res.status(200).json(product);
};
