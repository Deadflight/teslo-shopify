import { ICollection, IProduct } from "interfaces";
import { PRODUCTS_BY_COLLECTION, storeClient } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getPRODUCTS_BY_COLLECTION(req, res);
		default:
			return res.status(500).json({ message: "Method not allowed" });
	}
}

const getPRODUCTS_BY_COLLECTION = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { gender } = req.query;

	// const collectionName = gender + "-collection";

	const { collection } = await storeClient.request<ICollection>(
		PRODUCTS_BY_COLLECTION,
		{
			handle: gender,
		}
	);
	const { products } = collection;
	const { nodes } = products;
	return res.status(200).json(nodes);
};
