import { FC } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
	currentValue: number;
	maxValue: number;

	// Methods
	updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({
	currentValue,
	maxValue,
	updatedQuantity,
}) => {
	const addOrRemove = (value: number) => {
		if (value === -1) {
			if (currentValue === 1) return;

			return updatedQuantity(currentValue - 1);
		}

		if (currentValue >= maxValue) return;

		updatedQuantity(currentValue + 1);
	};

	return (
		<div className="flex items-center space-x-6">
			<button onClick={() => addOrRemove(-1)}>
				<AiOutlineMinusCircle className="h-6 w-6 text-gray-500" />
			</button>
			<p>{currentValue}</p>
			<button onClick={() => addOrRemove(+1)}>
				<AiOutlinePlusCircle className="h-6 w-6 text-gray-500" />
			</button>
		</div>
	);
};
