import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { postData } from "../utils/fetchData";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
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

	const { state, dispatch } = useContext(DataContext);
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
				<div className="w-11/12 p-2 bg-white sm:w-11/12 md:w-3/4 lg:w-5/12">
					<h1
						style={{ textTransform: "capitalize" }}
						className="text-xl text-center pb-3 font-semibold"
					>
						Hello Admin👋
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
