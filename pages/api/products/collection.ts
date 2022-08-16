import { ICollection, IProduct } from "interfaces";
import { ProductsByCollection, storeClient } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProductsByCollection(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const getProductsByCollection = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { gender } = req.query;

	// const collectionName = gender + "-collection";

	const { collection } = await storeClient.request<ICollection>(
		ProductsByCollection,
		{
			handle: gender,
		}
	);
	const { products } = collection;
	const { nodes } = products;
	return res.status(200).json(nodes);
};
