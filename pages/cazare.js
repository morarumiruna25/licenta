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
    outdate: tomorrow()
	};
  function today(i)
  {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      // today = dd+'/'+mm+'/'+yyyy;
      today = String(yyyy) + '-' + String(Number(mm) > 9 ? mm: "0" + mm) +'-'+ String(Number(dd) > 9 ? dd : "0" + dd)
      // today = yyyy + '-' + Number(mm) > 9 ? mm: "0" + mm +'-'+ dd

      return today;   
  }
  function tomorrow(i)
  {
      var today = new Date();
      var dd = today.getDate()+1;
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      // today = dd+'/'+mm+'/'+yyyy;
      tomorrow = String(yyyy) + '-' + String(Number(mm) > 9 ? mm: "0" + mm) +'-'+ String(Number(dd) > 9 ? dd : "0" + dd)
      // today = yyyy + '-' + Number(mm) > 9 ? mm: "0" + mm +'-'+ dd

      return tomorrow;   
  }
	const [card, setCard] = useState(initialState);
	const { locatie, rating, descriere, descriere_scurta, link, outdate, indate } = card;

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
		</div>
	);
}
