import Portal from "./Portal";
import { useContext, useEffect, useRef } from "react";
import { UiContext } from "@/context/ui";
import Link from "next/link";
import { FaChild, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import {
	HiOutlineTicket,
	HiOutlineLogout,
	HiOutlineUserGroup,
} from "react-icons/hi";
import { IoIosMan, IoIosWoman } from "react-icons/io";

const clientNavItems = [
	{
		name: "Profile",
		href: "/",
		icon: <FaRegUserCircle className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "My Orders",
		href: "/",
		icon: <HiOutlineTicket className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Logout",
		href: "/",
		icon: <HiOutlineLogout className="h-6 w-6 text-gray-500" />,
	},
];

const categoryNavItems = [
	{
		name: "Men",
		href: "/",
		icon: <IoIosMan className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Women",
		href: "/",
		icon: <IoIosWoman className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Kid",
		href: "/",
		icon: <FaChild className="h-6 w-6 text-gray-500" />,
	},
];

const adminNavItems = [
	{
		name: "Dashboard",
		href: "/",
		icon: <MdOutlineDashboard className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Products",
		href: "/",
		icon: <MdOutlineCategory className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Orders",
		href: "/",
		icon: <HiOutlineTicket className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Users",
		href: "/",
		icon: <HiOutlineUserGroup className="h-6 w-6 text-gray-500" />,
	},
];

export const SideBar = () => {
	const { isSideMenuOpen, isSlideIn, toggleSideMenu } = useContext(UiContext);
	const cartRef = useRef<any>(null);

	// Close the side menu when the user clicks outside of it
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

	return (
		<Portal>
			<aside
				className={`${isSlideIn ? "animate-fade-in" : "animate-fade-out"}
				${isSideMenuOpen ? "block" : "hidden"}
				h-screen overflow-hidden backdrop-blur-sm fixed w-screen z-10 backdrop-brightness-50
				`}
			>
				<section
					ref={cartRef}
					className={`${isSlideIn ? "animate-slide-in" : "animate-slide-out"}
					${isSideMenuOpen ? "flex" : "hidden"}
					h-screen w-64 bg-white flex-col fixed right-0 py-12 top-0 bottom-0
					}`}
				>
					<ul>
						<li className="py-2 px-4">
							<div
								className={
									"relative mx-auto w-full text-gray-600 flex justify-between items-center animate-fade-in transition-all duration-300 border-b-2 hover:border-[#1e1e1e] focus-within:border-[#1e1e1e]"
								}
							>
								{/* TODO: Focus input when sidebar is open */}
								<input
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

						{categoryNavItems.map((item) => (
							<li className="sidebar-item md:hidden" key={item.name}>
								<Link href={item.href} passHref>
									<a className="flex items-center space-x-10">
										{item.icon}
										<p>{item.name}</p>
									</a>
								</Link>
							</li>
						))}

						{clientNavItems.map((item) => (
							<li className="sidebar-item" key={item.name}>
								<Link href={item.href} passHref>
									<a className="flex items-center space-x-10">
										{item.icon}
										<p>{item.name}</p>
									</a>
								</Link>
							</li>
						))}

						<hr />

						{/* Admin Sidebar */}
						<li className="px-4 py-4 cursor-default">
							<p className="text-gray-600 font-medium text-sm">Admin Panel</p>
						</li>
						{adminNavItems.map((item) => (
							<li className="sidebar-item" key={item.name}>
								<Link href={item.href} passHref>
									<a className="flex items-center space-x-10">
										{item.icon}
										<p>{item.name}</p>
									</a>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</aside>
		</Portal>
	);
};
