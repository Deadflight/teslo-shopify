import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar, SideBar } from "../ui";
import Portal from "../ui/Portal";

interface Props {
	title: string;
	pageDescription: string;
	imageUrl?: string;
	children: ReactNode;
}

export const ShopLayout: FC<Props> = ({
	children,
	title,
	pageDescription,
	imageUrl,
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageDescription} />
			</Head>

			<header>
				<SideBar />
				<Navbar />
			</header>

			<main>{children}</main>
			<footer></footer>
		</>
	);
};
