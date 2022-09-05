import useSWR, { SWRConfiguration } from "swr";
// import { IProduct } from '../interfaces';

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProduct = (url: string, config: SWRConfiguration = {}) => {
	// const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );

	const { data, error } = useSWR(`/api${url}`, config);

	if (error) {
		throw new Error(error);
	}

	return {
		product: data!,
		isLoading: !error && !data,
		isError: error,
	};
};
