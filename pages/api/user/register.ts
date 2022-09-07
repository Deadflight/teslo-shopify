import { CustomerCreateMutation } from "../../../lib";
import type { NextApiRequest, NextApiResponse } from "next";
import { sdkSWR, sdkAdminSWR } from "../../../lib/shopify/client";

type Data =
	| {
			message: string;
	  }
	| CustomerCreateMutation;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "POST":
			return createCustomer(req, res);
	}
}

const createCustomer = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { email, password, firstName, lastName } = req.body;

	const response = await sdkSWR.customerCreate({
		input: {
			email,
			password,
			firstName,
			lastName,
		},
	});

	const { customerCreate } = response;

	if (customerCreate?.customerUserErrors[0]?.message) {
		return res
			.status(500)
			.json({ message: customerCreate.customerUserErrors[0].message });
	}

	if (!customerCreate) {
		return res
			.status(500)
			.json({ message: "Something goes wrong in register customer" });
	}

	return res.status(200).json(response);
};
