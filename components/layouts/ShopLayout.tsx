import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar, SideBar } from "../ui";

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

			<header className="top-0 sticky z-10">
				<SideBar />
				<Navbar />
			</header>

			<main className="px-6 md:px-8">{children}</main>
			<footer></footer>
		</>
	);
};
