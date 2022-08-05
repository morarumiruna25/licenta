import { useState } from "react";
import { imageUpload } from "../utils/imageUpload";
import { useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, getData, putData } from "../utils/fetchData";

export default function Admin() {
	const { state, dispatch } = useContext(DataContext);

	const initialState = {
		locatie: "Oltenia, Romania",
		rating: 0,
		descriere: "",
		descriere_scurta: "",
		link: ""
	};

	const [card, setCard] = useState(initialState);
	const { locatie, rating, descriere, descriere_scurta, link} = card;

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
				<div className="md:grid md:grid-cols-2 md:gap-6">
					<div className="md:col-span-1"></div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form onSubmit={handleSubmit}>
							<div className="shadow sm:rounded-md sm:overflow-hidden">
								<div className="px-4 py-5 bg-slate-100 space-y-6 sm:p-6">
									<div className="grid grid-cols-4 gap-6">
										<div className="col-span-2 sm:col-span-2">
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
												Rating
											</label>

											<div className="mt-1 flex rounded-md shadow-sm">
												<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark bg-gray-50 text-gray-500 text-sm">
													⭐
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
												</select>
											</div>
										</div>
									</div>

									<div>
										<label
											htmlFor="about"
											className="block text-sm font-medium text-gray-700"
										>
											Scurta descriere ...
										</label>
										<div className="mt-1">
											<textarea
												id="descriere_scurta"
												name="descriere_scurta"
												rows={2}
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
												placeholder="Intre 5 si 20 de cuvinte"
												value={descriere_scurta}
												onChange={handleChangeInput}
											/>
										</div>
										<p className="mt-2 text-sm text-gray-500"></p>
									</div>
									<div>
										<label
											htmlFor="about"
											className="block text-sm font-medium text-gray-700"
										>
											Descriere
										</label>
										<div className="mt-1">
											<textarea
												id="descriere"
												name="descriere"
												rows={5}
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
												placeholder="Descriere in detaliu"
												onChange={handleChangeInput}
												value={descriere}
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="about"
											className="block text-sm font-medium text-gray-700"
										>
											<a 
											
											 href="https://www.google.com/maps" 
											 className="inline-flex justify-center py-1 px-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											 target="_blank" rel="noreferrer"
											 >
												Link Maps
											</a>
										</label>
										<div className="mt-1">
											<textarea
												id="link"
												name="link"
												rows={2}
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
												placeholder="Link afterent de pe google maps Ex: http://www.google.com/maps/oletnia/romania"
												onChange={handleChangeInput}
												value={link}
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700">
											Fotografii{" "}
										</label>
										<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
											<div className="space-y-1 text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-400"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 48 48"
													aria-hidden="true"
												>
													<path
														d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<div className="flex text-sm text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
													>
														<span className="text-xl px-2 ">Upload a file</span>
														<input
															id="file-upload"
															name="file-upload"
															type="file"
															className="sr-only"
															multiple
															onChange={handleimg}
															// accept="image/*"
														/>
													</label>
												</div>
												<p className="text-xs text-gray-500">
													PNG sau JPG - Max 1 MB
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Incarca in baza de date
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
