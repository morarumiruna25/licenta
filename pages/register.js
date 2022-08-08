import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { postData } from "../utils/fetchData";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";
import Link from "next/link";
import Router from "next/router";

export default function Register() {


	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	useEffect(() => {
		if (Object.keys(auth).length === 0) {
			dispatch({ type: "NOTIFY", payload: { error: "Acces Neautorizat" } });
			Router.push("/");
		}
	}, []);


	const initialState = {
		nume: "",
		prenume: "",
		email: "",
		telefon: "",
		password: "",
		cf_password: "",
	};
	const [userData, setUserData] = useState(initialState);
	const { nume, prenume, email, telefon, password, cf_password } = userData;

	// const { auth } = state;

	// const router = useRouter();

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errMsg = valid(nume, email, password, cf_password);
		if (errMsg) {
			return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
		}
		dispatch({ type: "NOTIFY", payload: { Loading: true } });

    // console.log(userData);
		const res = await postData("auth/register", userData);
		setUserData(initialState);
		if (res.err)
			return dispatch({ type: "NOTIFY", payload: { error: res.err } });

		return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
	};
	// useEffect(() => {
	//   if (Object.keys(auth).length === 0) router.push('/');
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [auth]);
	return (
		<div>
			<div className="flex justify-center pt-5 px-0">
				<div className="w-11/12 p-2 bg-white sm:w-11/12 md:w-3/4 lg:w-7/12">
					<h1
						style={{ textTransform: "capitalize" }}
						className="text-xl text-center pb-3 font-semibold"
					>
							<div
						className="col-span-2 m-2 inline-flex rounded-md shadow-sm mx-auto"
						role="group"
					>
						<Link href="/register">
							<a
								type="button"
								className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="mr-2 w-4 h-4 fill-current"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
										clipRule="evenodd"
									></path>
								</svg>
								Mengereiaza Users

							</a>
						</Link>
						<Link 	href="/admincazare">
						<a
						
							type="button"
							className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
						>
							<svg
								aria-hidden="true"
								className="mr-2 w-4 h-4 fill-current"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
							</svg>
							Adauga cazari
						</a>
						</Link>
						<Link href="/admin">
							<a
								type="button"
								className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
							>
								Adauga atractii turistice
							</a>
						</Link>
					</div>
					</h1>

					<form className="mt-6" onSubmit={handleSubmit}>
						<div className="flex justify-between gap-3">
							<span className="w-1/2">
								<label
									htmlFor="firstname"
									className="block text-xs font-semibold text-gray-600 uppercase"
								>
									Nume
								</label>
								<input
									id="firstname"
									type="text"
									name="nume"
									value={nume}
									onChange={handleChangeInput}
									placeholder="John"
									className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
								/>
							</span>
							<span className="w-1/2">
								<label
									htmlFor="lastname"
									className="block text-xs font-semibold text-gray-600 uppercase"
								>
									Prenume
								</label>
								<input
									id="lastname"
									type="text"
									name="prenume"
									onChange={handleChangeInput}
									value={prenume}
									placeholder="Doe"
									className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
								/>
							</span>
						</div>
						<label
							htmlFor="email"
							className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
						>
							E-mail
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={email}
							onChange={handleChangeInput}
							placeholder="email.doe@company.com"
							className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
						/>
						<label
							htmlFor="telefon"
							className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
						>
							telefon
						</label>
						<input
							id="telefon"
							type="telefon"
							name="telefon"
							value={telefon}
							onChange={handleChangeInput}
							placeholder="07********"
							className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
						/>
						<label
							htmlFor="password"
							className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
						>
							Parola
						</label>
						<input
							id="password"
							type="password"
							name="password"
							onChange={handleChangeInput}
							value={password}
							placeholder="********"
							className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
						/>
						<label
							htmlFor="password-confirm"
							className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
						>
							Confirmare Parola
						</label>
						<input
							id="password-confirm"
							type="password"
							onChange={handleChangeInput}
							name="cf_password"
							value={cf_password}
							placeholder="********"
							className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
						/>
						<button
							href="/registeruser"
							type="submit"
							className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
						>
							Creaza Cont{" "}
						</button>
						{/* <a
              href="/login"
              className="text-xl flex justify-between inline-block mt-4 text-xs text-gray-700 cursor-pointer hover:text-black">
              Already registered?
            </a> */}
					</form>
					<Link href="/admin">
						<button className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
							Panou admin
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
