import type { NextApiRequest, NextApiResponse } from "next";
import { GET_ALL_PRODUCTS, storeClient, GET_PRODUCT_BY_HANDLE } from "lib";
import { IProduct, IProducts, IProductHandle } from "interfaces";

type Data =
	| {
			message: string;
	  }
	| IProduct;

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

	const { product } = await storeClient.request<IProductHandle>(
		GET_PRODUCT_BY_HANDLE,
		{
			handle: slug,
		}
	);
	return res.status(200).json(product);
};
