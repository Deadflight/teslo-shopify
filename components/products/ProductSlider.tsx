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
				display: "block",
				zIndex: 1,
				background: "transparent",
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
		speed: 750,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
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
						width={600}
						height={600}
						quality={100}
						priority
					/>
				</div>
			))}
		</Slider>
	);
};
