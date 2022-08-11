import { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const FullScreenLoading: FC = () => {
	return (
		<div
			role="status"
			className="w-full h-[calc(100vh-4rem)] flex items-center justify-center flex-col gap-4 text-xl font-extralight"
		>
			<span className="">Loading...</span>
			<AiOutlineLoading className="animate-spin h-10 w-10 text-gray-500" />
		</div>
	);
};
