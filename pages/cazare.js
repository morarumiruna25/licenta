/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { imageUpload } from "../utils/imageUpload";
import { useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, getData, putData } from "../utils/fetchData";

export default function Admin(props) {
	const { state, dispatch } = useContext(DataContext);
	const initialState = {
		locatie: "",
		rating: 2,
		indate: today(),
		outdate: tomorrow(),
		pret: "20000",
		rating: "5",
	};

	function today(i) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		// today = dd+'/'+mm+'/'+yyyy;
		today =
			String(yyyy) +
			"-" +
			String(Number(mm) > 9 ? mm : "0" + mm) +
			"-" +
			String(Number(dd) > 9 ? dd : "0" + dd);
		// today = yyyy + '-' + Number(mm) > 9 ? mm: "0" + mm +'-'+ dd

		return today;
	}
	function tomorrow(i) {
		var today = new Date();
		var dd = today.getDate() + 2;
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		// today = dd+'/'+mm+'/'+yyyy;
		tomorrow =
			String(yyyy) +
			"-" +
			String(Number(mm) > 9 ? mm : "0" + mm) +
			"-" +
			String(Number(dd) > 9 ? dd : "0" + dd);
		// today = yyyy + '-' + Number(mm) > 9 ? mm: "0" + mm +'-'+ dd

		return tomorrow;
	}
	const [card, setCard] = useState(initialState);
	const { locatie, numarp, outdate, indate, pret, rating } = card;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
		console.log(card);
	};

	return (
		<div>
			<div>
				<div className="md:grid md:grid-cols-2">
					<div className="md:col-span-1 col-span-2"></div>
					<div className=" md:mt-0 md:col-span-2">
						<div className="shadow sm:rounded-md sm:overflow-hidden">
							<div className="px-4 py-5 bg-slate-100 space-y-6 sm:p-6">
								<div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
									<div className="col-span-2 xl:col-span-2">
										<label
											htmlFor="company-website"
											className="block text-sm font-medium text-dark"
										>
											Locatei
										</label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark bg-gray-50 text-gray-500 text-sm">
												📍
											</span>
											<input
												value={locatie}
												type="text"
												name="locatie"
												id="locatie"
												className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												placeholder=" Undeva in oltenia ..."
												onChange={handleChangeInput}
											/>
										</div>
									</div>
									<div className="col-span-2 sm:col-span-2">
										<label
											htmlFor="company-website"
											className="block text-sm font-medium text-dark"
										>
											Numar persoane
										</label>

										<div className="mt-1 flex rounded-md shadow-sm">
											<span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-dark bg-gray-50 text-gray-500 text-xl">
												👫{" "}
											</span>
											<select
												value={numarp}
												type="number"
												name="numarp"
												id="numarp"
												className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												onChange={handleChangeInput}
											>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
											</select>
										</div>
									</div>
									<div className="col-span-2 sm:col-span-2">
										<label
											htmlFor="company-website"
											className="block text-sm font-medium text-dark"
										>
											Data
										</label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark bg-gray-50 text-gray-500 text-sm">
										IN 😀
											</span>
											<input
												value={indate}
												type="date"
												name="indate"
												id="indate"
												className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												onChange={handleChangeInput}
											/>
										</div>
									</div>{" "}
									<div className="col-span-2 sm:col-span-2">
										<label
											htmlFor="company-website"
											className="block text-sm font-medium text-dark"
										>
											Data
										</label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark bg-gray-50 text-gray-500 text-sm">
											OUT 🙁
											</span>
											<input
												value={outdate}
												type="date"
												name="outdate"
												id="outdate"
												className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												onChange={handleChangeInput}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-5 m-10 w-3/4 mx-auto s grid grid-cols-4 gap-4">
				<div className=" sm:col-span-1 col-span-4">
					<h2 className="pt-7 pb-2 font-bold">Pret :</h2>
					<fieldset className="p-2 pb-0 shadow-lg bg-slate-100 rounded-lg border">
						<legend className="sr-only">Checkbox variants</legend>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="pret"
								value={100}
								onChange={handleChangeInput}
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								0 - 100 Lei
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="pret"
								value={199}
								onChange={handleChangeInput}
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								0 - 199 Lei
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="pret"
								value={399}
								onChange={handleChangeInput}
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								0 - 399 Lei
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="pret"
								value={200000}
								onChange={handleChangeInput}
								classNames="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								399+
							</label>
						</div>
					</fieldset>

					<h2 className="pt-7 pb-2 font-bold">Stele :</h2>
					<div>
						<fieldset className="p-2 pb-0 shadow-lg bg-slate-100 rounded-lg border">
							<legend className="sr-only">Checkbox variants</legend>

							<div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value="1"
									name="rating"
									onChange={handleChangeInput}
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐
								</label>
							</div>
							<div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value="2"
									name="rating"
									onChange={handleChangeInput}
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐
								</label>
							</div>
							<div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value="3"
									name="rating"
									onChange={handleChangeInput}
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐⭐
								</label>
							</div>
							<div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value="4"
									name="rating"
									onChange={handleChangeInput}
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐⭐⭐
								</label>
							</div>
							<div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value="5"
									name="rating"
									onChange={handleChangeInput}
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐⭐⭐⭐
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className=" sm:col-span-3 col-span-4 pt-8">
					{console.log(props.cards)}
					{props.cards
						.filter((val) => {
							if (Number(val.pret) > card.pret && val.rating <= card.rating) {
							}
							else if (val.adresa.includes(card.locatie)) {
								return val;
							}
						})
						.map((val) => (
							<div key={val._id}>
								<div className="my-3 grid bg-gray-100 border-1 rounded-xl shadow-lg grid-cols-3 ">
									<div className="col-span-3 p-2 sm:col-span-1 mr-2 ">
										<img
											className="object-cover h-full w-full border-1 rounded-lg"
											src={val.images[0].url}
											alt=""
										></img>{" "}
									</div>
									<div className=" col-span-3 sm:col-span-2">
										<h5 className="text-2xl font-bold text-blue-800 dark:text-white">
											{val.nume}
										</h5>
										<h1 className="mb-2 text-xs italic  font-bold text-gray-500">
											📍 {val.adresa}
										</h1>
										<p className="pb-1 font-normal  text-gray-700 dark:text-gray-400">
											{val.descriere}
										</p>
										<div className="text-lg justify-self-end font-bold text-green-500 dark:text-gray-400">
											{val.pret} lei / noapte / persoana
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
export async function getServerSideProps({ query }) {
	const page = query.page || 1;
	const category = query.category || "all";
	const sort = query.sort || "";
	const search = query.search || "all";

	const res = await getData("cardcazare");
	// server side rendering
	return {
		props: {
			cards: res.cards,
			// result: res.result
		}, // will be passed to the page component as props
	};
}
