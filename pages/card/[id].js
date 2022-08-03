/* eslint-disable @next/next/no-img-element */
import { getData } from "../../utils/fetchData";
import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";

const Card_detail = (props) => {
	const [card] = useState(props.card);
	const { state, dispatch } = useContext(DataContext);

	const [tab, setTab] = useState(0);

	const isActive = (index) => {
		if (tab === index) return " active";
		return "";
	};
	return (
		<div>
			<section className="text-gray-600 body-font">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
						<img
							className="shadow-lg rounded-lg border-violet-200 object-cover object-center rounded"
							src={card.images[tab].url}
							alt={card.images[tab].url}
						></img>
						<div className="grid grid-cols-5 gap-2">
							{card.images.map((img, index) => (
								<img
									key={index}
									src={img.url}
									alt={img.url}
									className={`border-2 my-2 border-gray-700 rounded w-full h-4/6 ${isActive(
										index
									)}`}
									onClick={() => setTab(index)}
								/>
							))}
						</div>
					</div>
					<div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
							{card.descriere_scurta}
						</h1>
						<p className="mb-8 justify-self-start leading-relaxed">
							{card.descriere}
						</p>
						<div className="flex justify-center">
							<Link href="/">
								<button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
									Pagina pricipala
								</button>
							</Link>

							<button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
								See On Map
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`card/${id}`);
	// server side rendering
	console.log(res);
	return {
		props: { card: res.card }, // will be passed to the page component as props
	};
}

export default Card_detail;
