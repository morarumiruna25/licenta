/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { imageUpload } from "../utils/imageUpload";
import { useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, getData, putData } from "../utils/fetchData";

export default function Admin() {
	const { state, dispatch } = useContext(DataContext);

	const initialState = {
		locatie: "Oltenia, Romania",
		rating: 2,
		descriere: "",
		descriere_scurta: "",
		link: "",
		indate: today(),
		outdate: tomorrow(),
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
		var dd = today.getDate() + 1;
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
	const {
		locatie,
		rating,
		descriere,
		descriere_scurta,
		link,
		outdate,
		indate,
	} = card;

	const [images, setImages] = useState([]);

	const handleimg = (e) => {
		let newImages = [];
		let num = 0;
		let err = "";
		const files = [...e.target.files];

		if (files.length === 0)
			return dispatch({
				type: "NOTIFY",
				payload: { error: "Minum o poza" },
			});

		files.forEach((file) => {
			if (file.size > 1024 * 2024)
				return (err = "Dimensiuea maxim admisa este de 1 MB");

			if (file.type !== "image/jpeg" && file.type !== "image/png")
				return (err = "Format poza incorect doar ( JPG / PNG )");
			num += 1;
			if (num <= 5) newImages.push(file);
			return newImages;
		});

		if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

		const imgCount = images.length;
		if (imgCount + newImages.length > 5)
			return dispatch({
				type: "NOTIFY",
				payload: { error: "Select up to 5 images." },
			});
		setImages([...images, ...newImages]);
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let media = [];

		const imgNewURL = images.filter((img) => !img.url);
		const imgOldURL = images.filter((img) => img.url);

		if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

		let res;

		res = await postData(
			"card",
			{ ...card, images: [...imgOldURL, ...media] }
			// ,	auth.token
		);

		if (res.err)
			return dispatch({ type: "NOTIFY", payload: { error: res.err } });
		else {
			dispatch({
				type: "NOTIFY",
				payload: { success: ": Incarcat in baza de date" },
			});
			11;
			setCard(initialState);
			setImages([]);
		}
	};

	return (
		<div>
			<div>
				<div className="md:grid md:grid-cols-2">
					<div className="md:col-span-1"></div>
					<div className=" md:mt-0 md:col-span-2">
						<form onSubmit={handleSubmit}>
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
													🧍
												</span>
												<select
													value={rating}
													type="number"
													name="rating"
													id="rating"
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
													IN
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
													OUT
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
						</form>
					</div>
				</div>
			</div>
			<div className="mt-5 m-10 w-3/4 mx-auto s grid grid-cols-4 gap-4">
				<div className=" col-span-1">
					<h2 className="pt-7 pb-2 font-bold">Pret :</h2>
					<fieldset className="p-2 pb-0 shadow-lg bg-slate-100 rounded-lg border">
						<legend className="sr-only">Checkbox variants</legend>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="countries"
								value="USA"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked
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
								name="countries"
								value="USA"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								100 - 199 Lei
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="countries"
								value="USA"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked
							></input>
							<label
								htmlFor="checkbox-2"
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								199-399 Lei
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="countries"
								value="USA"
								classNames="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked
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
									value=""
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
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐
								</label>
						
								
							</div><div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								></input>{" "}
								<label
									htmlFor="checkbox-2"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{" "}
									⭐⭐⭐
								</label>
						
								
							</div><div className="flex items-center mb-4">
								<input
									id="checkbox-2"
									type="checkbox"
									value=""
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
						</fieldset>
					</div>
				</div>
				<div className="col-span-3">
					<div className="my-3 grid bg-gray-100 border-1 rounded-xl shadow-lg grid-cols-3 ">
						<div className="col-span-3 p-2 sm:col-span-1 mr-2 ">
							<img
								className="object-cover h-full w-full border-1 rounded-lg"
								src="/caru1.jpeg"
								alt=""
							></img>{" "}
						</div>
						<div className=" col-span-3 sm:col-span-2">
							<h5 className="text-2xl font-bold text-blue-800 dark:text-white">
								Noteworthy technology acquisitions 2021
							</h5>
							<h1 className="mb-2 text-xs italic  font-bold text-gray-500">
								Aleea privighetroii, nr357
							</h1>
							<p className="pb-1 font-normal  text-gray-700 dark:text-gray-400">
								Pensiunea Venera este situata in satul Sanatesti, comuna Arcani,
								judetul Gorj, la o distanta de 12km de Municipiul Targu Jiu (DN
								67)
							</p>
							<div className="text-lg justify-self-end font-bold text-green-500 dark:text-gray-400">
								200 lei / zi / camera
							</div>
						</div>
					</div>
					<div className="grid bg-gray-100 border-1 rounded-xl shadow-lg grid-cols-3 ">
						<div className="col-span-3 p-2  sm:col-span-1 mr-2 ">
							<img
								className="object-cover h-full w-full border-1 rounded-lg"
								src="/caru1.jpeg"
								alt=""
							></img>{" "}
						</div>
						<div className=" col-span-3 sm:col-span-2">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Noteworthy technology acquisitions 2021
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								Here are the biggest enterprise technology acquisitions of 2021
								so far, in reverse chronological order. shadowasda
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
