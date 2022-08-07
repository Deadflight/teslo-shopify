import Portal from "./Portal";
import { useContext, useEffect, useRef } from "react";
import { UiContext } from "@/context/ui";
import Link from "next/link";

const clientNavItems = [
	{
		name: "Profile",
		href: "/",
		icon: "user",
	},
];

export const SideBar = () => {
	const { isSideMenuOpen, isSlideIn, isSlideOut, toggleSideMenu } =
		useContext(UiContext);
	const cartRef = useRef<any>(null);
	const searchRef = useRef<any>(null);

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (isSideMenuOpen && !cartRef.current.contains(e.target)) {
				toggleSideMenu();
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isSideMenuOpen, toggleSideMenu]);

	// `${
	// 					isSideMenuOpen
	// 						? "h-screen overflow-hidden backdrop-blur-sm fixed w-screen z-10 backdrop-brightness-50 animate-fade-in"
	// 						: "animate-fade-out opacity-0 pointer-events-none hidden"
	// 				}
	return (
		<Portal>
			<aside
				className={`${isSlideIn ? "animate-fade-in" : ""}
				${isSlideOut ? "animate-fade-out" : ""}
				${isSideMenuOpen ? "block" : "hidden"}
				h-screen overflow-hidden backdrop-blur-sm fixed w-screen z-10 backdrop-brightness-50
				`}
			>
				<section
					ref={cartRef}
					className={`${isSlideIn ? "animate-slide-in" : ""}
					${isSlideOut ? "animate-slide-out" : ""}
					${isSideMenuOpen ? "flex" : "hidden"}
					h-screen w-64 bg-white flex-col fixed right-0 py-12
					}`}
				>
					<div className="flex items-center space-x-1 text-center justify-center cursor-default">
						<h6 className="text-xl font-medium">Teslo |</h6>
						<p>Shop</p>
					</div>
					<ul>
						<li className="py-2 px-4">
							<div
								className={
									"relative mx-auto w-full text-gray-600 flex justify-between items-center animate-fade-in transition-all duration-300 border-b-2 hover:border-[#1e1e1e] focus-within:border-[#1e1e1e]"
								}
							>
								<input
									ref={searchRef}
									className="border-gray-300 bg-white h-10 rounded-lg focus:outline-none leading-3"
									type="search"
									placeholder="Search..."
								/>
								<button className="p-2 btn-animated">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 stroke-gray-600"
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
							</div>
						</li>

						{/* Client SideBar */}

						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<p>Profile</p>
								</a>
							</Link>
						</li>

						<li className="sidebar-item">
							<Link href="/orders" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
										/>
									</svg>
									<p>My Orders</p>
								</a>
							</Link>
						</li>
						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									<p>Logout</p>
								</a>
							</Link>
						</li>
						<hr />
						{/* Admin Sidebar */}
						<li className="px-4 py-4 cursor-default">
							<p className="text-gray-600 font-medium text-sm">Admin Panel</p>
						</li>
						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
										/>
									</svg>
									<p>Dashboard</p>
								</a>
							</Link>
						</li>
						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
										/>
									</svg>
									<p>Products</p>
								</a>
							</Link>
						</li>
						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
										/>
									</svg>
									<p>Orders</p>
								</a>
							</Link>
						</li>
						<li className="sidebar-item">
							<Link href="/" passHref>
								<a className="flex items-center space-x-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<p>Users</p>
								</a>
							</Link>
						</li>
					</ul>
				</section>
			</aside>
		</Portal>
	);
};
