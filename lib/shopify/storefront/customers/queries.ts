import { gql } from "graphql-request";

export const SEARCH_CUSTOMER = gql`
	query searchCustomer($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			firstName
			lastName
			email
			id
		}
	}
`;
