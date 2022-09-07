import { UiContext, CartContext } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState, useContext, useRef, useEffect } from "react";

const navItems = [
	{
		name: "Men",
		path: "/category/men",
	},
	{
		name: "Women",
		path: "/category/women",
	},
	{
		name: "Kids",
		path: "/category/kids",
	},
];

export const Navbar: FC = () => {
	const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
	const searchRef = useRef<any>(null);
	const { numberOfItems } = useContext(CartContext);
	const [searchTerm, setSearchTerm] = useState("");
	const { push, asPath } = useRouter();

	const { toggleSideMenu } = useContext(UiContext);

	const handleOpenSearchBar = () => {
		if (window.innerWidth < 768) {
			toggleSideMenu();
		} else {
			setIsSearchInputVisible(true);
		}
	};

	useEffect(() => {
		if (isSearchInputVisible) {
			searchRef.current.focus();
		}
	}, [isSearchInputVisible]);

	const handleSearch = () => {
		if (searchTerm.trim().length === 0) return;
		push(`/search/${searchTerm}`);
	};

	return (
		<nav className="w-full flex justify-between px-6 h-16 items-center z-10 bg-white">
			<Link href="/" passHref>
				<a className="flex items-center space-x-1">
					<h6 className="text-xl font-medium">Teslo |</h6>
					<p>Shop</p>
				</a>
			</Link>

			<ul
				className={
					isSearchInputVisible
						? "hidden"
						: "hidden md:flex transition-all duration-200 animate-fade-in"
				}
			>
				{navItems.map((item) => (
					<li key={item.name} className="space-x-1">
						<Link href={item.path} passHref>
							<a
								className={`font-medium text-sm py-1 px-3 btn-animated opacity-80 ${
									asPath === item.path ? "bg-black text-white" : "text-black"
								}`}
							>
								{item.name}
							</a>
						</Link>
					</li>
				))}
			</ul>
			<ul className="flex items-center">
				<li>
					<button
						className={
							isSearchInputVisible
								? "hidden"
								: "block p-2 btn-animated animate-fade-in"
						}
						aria-label="Search Icon"
						onClick={() => handleOpenSearchBar()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 stroke-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<div
						className={
							isSearchInputVisible
								? "relative mx-auto text-gray-600 flex items-center animate-fade-in transition-all duration-300 border-b-2 hover:border-[#1e1e1e] focus-within:border-[#1e1e1e]"
								: "hidden"
						}
					>
						<input
							className="border-gray-300 bg-white h-10 rounded-lg focus:outline-none leading-3"
							type="search"
							placeholder="Search..."
							ref={searchRef}
							onBlur={() => setIsSearchInputVisible(false)}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
						/>
						<button
							aria-label="Close Search"
							className="p-2 btn-animated"
							onClick={() => setIsSearchInputVisible(false)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 stroke-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</li>
				<li>
					<Link href={`/cart`}>
						<a
							className="flex items-center p-2 btn-animated w-full relative"
							aria-label="Cart Icon"
						>
							{!!numberOfItems && (
								<span className="absolute right-0 -translate-y-3 text-white translate-x-1 place-content-center flex items-center justify-center flex-row flex-nowrap text-xs font-medium bg-blue-500 rounded-full min-w-[20px] h-5 text-center">
									{numberOfItems}
								</span>
							)}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 stroke-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</a>
					</Link>
				</li>
				<li>
					<button
						className="font-medium text-sm py-1 px-3 btn-animated text-black opacity-80"
						onClick={toggleSideMenu}
					>
						<span>Menu</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};
