/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Notify from "./Notify";
import { DataContext } from "../store/GlobalState";
import { useContext, useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import Cookie from "js-cookie";

const navigation = [
	{ name: "Locuti de Vizitat", href: "/", current: true },
	{ name: "Ofete cazare", href: "cazare", current: true },
];

const navigation2 = [
	// {
	// 	name: "Admin",
	// 	href: "/admin",
	// 	current: false,
	// },
	{
		name: "Login",
		href: "/login",
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = ({ children }) => {
	const router = useRouter();

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const handleLogout = async (e) => {
		e.preventDefault();
		Cookie.remove("refreshtoken", { path: "api/accessToken" });
		localStorage.removeItem("firstLogin");
		await dispatch({
			type: "NOTIFY",
			payload: { success: "Logged out!" },
		});
		window.location.reload(false);
		return router.push("/");
	};

	const adminRouter = () => {
		return (
			<>
				<Link href="admin">
					<button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
						Admin Panel{" "}
					</button>
				</Link>
				<button
					className={classNames(
						"text-gray-300 hover:bg-gray-700 hover:text-white",
						"px-3 py-2 rounded-md text-sm font-medium"
					)}
					onClick={handleLogout}
				>
					Logout
				</button>
			</>
		);
	};

	return (
		<div>
			<Notify />

			<Disclosure as="nav" className="bg-slate-700">
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-16">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
									<div className="flex-shrink-0 flex items-center">
										<img
											className="hidden sm:block h-11 w-auto"
											src="/logo.png"
											alt="Workflow"
										/>
									</div>
									<div className="hidden sm:block sm:ml-6">
										{Object.keys(auth).length == !0 ? null : (
											<div className="flex space-x-3">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(
															item.current
																? "bg-gray-900 text-white"
																: "text-gray-300 hover:bg-gray-700 hover:text-white",
															"px-3 py-2 rounded-md text-sm font-medium"
														)}
														aria-current={item.current ? "page" : undefined}
													>
														{item.name}
													</a>
												))}
											</div>
										)}

										
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<div className="flex space-x-3">
										{Object.keys(auth).length > 0
											? null
											: navigation2.map((item) => (
													<Link key={item.name} href={item.href}>
														<a
															className={classNames(
																item.current
																	? "bg-gray-900 text-white"
																	: "text-gray-300 hover:bg-gray-700 hover:text-white",
																"px-3 py-2 rounded-md text-sm font-medium"
															)}
															aria-current={item.current ? "page" : undefined}
														>
															{item.name}
														</a>
													</Link>
											  ))}

										{Object.keys(auth).length > 0 ? adminRouter() : null}
									</div>
									{/* Profile dropdown */}
									<Menu as="div" className="ml-3 relative">
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Settings
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Sign out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			{children}
		</div>
	);
};

export default Navbar;
