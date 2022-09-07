import { GetProductsByCollectionQuery, sdkSWR } from "../../../lib";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | GetProductsByCollectionQuery;

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
	const { gender = "" } = req.query as { gender: string };

	if (!gender.length) return res.status(500).json({ message: "Error Server" });

	// const collectionName = gender + "-collection";

	const productsByCollection = await sdkSWR.getProductsByCollection({
		handle: gender,
	});

	if (!productsByCollection.collection)
		return res.status(404).json({
			message: `Error Collection not foud: ${productsByCollection.collection}`,
		});

	return res.status(200).json(productsByCollection);
};
