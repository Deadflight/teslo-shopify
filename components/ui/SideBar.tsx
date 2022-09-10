import Portal from "./Portal";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, UiContext } from "../../context";
import { FaChild, FaRegUserCircle } from "react-icons/fa";
import {
	MdOutlineDashboard,
	MdOutlineCategory,
	MdOutlineVpnKey,
} from "react-icons/md";
import {
	HiOutlineTicket,
	HiOutlineLogout,
	HiOutlineUserGroup,
} from "react-icons/hi";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { useRouter } from "next/router";

const guestClientNavItems = [
	{
		name: "Log In",
		href: "/auth/login",
		icon: <MdOutlineVpnKey className="h-6 w-6 text-gray-500" />,
	},
];

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
		href: "/category/men",
		icon: <IoIosMan className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Women",
		href: "/category/women",
		icon: <IoIosWoman className="h-6 w-6 text-gray-500" />,
	},
	{
		name: "Kid",
		href: "/category/kids",
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
	const [searchTerm, setSearchTerm] = useState("");
	const { logout, isLoggedIn, user } = useContext(AuthContext);

	const { push } = useRouter();

	const handleSearch = () => {
		if (searchTerm.trim().length === 0) return;
		toggleSideMenu();
		push(`/search/${searchTerm}`);
	};

	const handlePush = (item: {
		name: string;
		href: string;
		icon: JSX.Element;
	}) => {
		if (item.name === "Logout") {
			logout();
		}
		toggleSideMenu();
		push(item.href);
	};

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
				h-screen overflow-hidden backdrop-blur-sm fixed w-screen z-30 backdrop-brightness-50
				`}
			>
				<section
					ref={cartRef}
					className={`${isSlideIn ? "animate-slide-in" : "animate-slide-out"}
					${isSideMenuOpen ? "flex" : "hidden"}
					w-64 bg-white fixed right-0 py-10 top-0 bottom-0 z-20 overflow-y-auto
					}`}
				>
					<ul className="">
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
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
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
								<button
									className="flex items-center space-x-10 border-none"
									onClick={() => handlePush(item)}
								>
									{item.icon}
									<p>{item.name}</p>
								</button>
							</li>
						))}

						{guestClientNavItems.map((item) => (
							<li
								className={` ${!isLoggedIn ? "" : "hidden"} sidebar-item`}
								key={item.name}
							>
								<button
									className="flex items-center space-x-10 border-none"
									onClick={() => handlePush(item)}
								>
									{item.icon}
									<p>{item.name}</p>
								</button>
							</li>
						))}

						{clientNavItems.map((item) => (
							<li
								className={` ${isLoggedIn ? "" : "hidden"} sidebar-item`}
								key={item.name}
							>
								<button
									className="flex items-center space-x-10 border-none"
									onClick={() => handlePush(item)}
								>
									{item.icon}
									<p>{item.name}</p>
								</button>
							</li>
						))}

						<hr />

						{/* Admin Sidebar */}
						{/* <li className={`px-4 py-4 cursor-default`}>
							<p className="text-gray-600 font-medium text-sm">Admin Panel</p>
						</li>
						{adminNavItems.map((item) => (
							<li className="sidebar-item" key={item.name}>
								<button
									className="flex items-center space-x-10 border-none"
									onClick={() => handlePush(item)}
								>
									{item.icon}
									<p>{item.name}</p>
								</button>
							</li>
						))} */}
					</ul>
				</section>
			</aside>
		</Portal>
	);
};
