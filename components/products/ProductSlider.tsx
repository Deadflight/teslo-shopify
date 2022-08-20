import { INodeImage } from "interfaces";
import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./productslider.module.css";

interface Props {
	images: INodeImage;
}

const CustomPrevArrow = (props: any) => {
	const { className, style, onClick } = props;

	return (
		<div
			className={className + " " + styles["slick-prev"]}
			style={{
				...style,
				left: 0,
				display: "block",
				zIndex: 1,
				background: "transparent",
				fontSize: "30px",
				color: "black",
			}}
			onClick={onClick}
		/>
	);
};

const CustomNextArrow = (props: any) => {
	const { className, style, onClick } = props;

	return (
		<div
			className={className + " " + styles["slick-next"]}
			style={{
				...style,
				right: 0,
				display: "block",
				background: "transparent",
				color: "black",
			}}
			onClick={onClick}
		/>
	);
};

export const ProductSlider: FC<Props> = ({ images }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
	};

	return (
		<Slider {...settings}>
			{images.nodes.map((image) => (
				<div key={image.url} className="">
					<Image
						src={image.url}
						alt={image.altText}
						layout="responsive"
						width={1200}
						height={1200}
						quality={100}
					/>
				</div>
			))}
		</Slider>
	);
};
