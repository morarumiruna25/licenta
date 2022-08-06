import connectDB from "../../../utils/connectDB";
import CardCazare from "../../../models/cardCazareModel";
// import auth from '../../../middleware/auth'

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	switch (req.method) {
		case "GET":
			await getCards(req, res);
			break;
		case "POST":
			await createCard(req, res);
			break;
	}
};

class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString };
    console.log(queryObj)
		const excludeFields = ["pret", "data", "rating"];
		excludeFields.forEach((el) => delete queryObj[el]);

		// if(queryObj.category !== 'all')
		//     this.query.find({category: queryObj.category})
		// if(queryObj.title !== 'all')
		//     this.query.find({title: {$regex: queryObj.title}})

		this.query.find();
     console.log(this.query.find())
		return this;
	}

	sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join("");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}

		return this;
	}
}

const getCards = async (req, res) => {
	try {
	// 	const features = new APIfeatures(CardCazare.find(), req.query)
	// 		.filtering()
	// 		.sorting();
	// 	const cards = await features.query;

		const cards = await CardCazare.find();

		res.json({ cards });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const createCard = async (req, res) => {
	try {
		// const result = await auth(req, res)
		// if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

		const { adresa, rating, descriere, link, nume, pret, images } = req.body;

		const newCardCazare = new CardCazare({
			adresa,
			rating,
			nume,
			pret,
			descriere,
			link,
			images,
		});

		await newCardCazare.save();

		res.json({ msg: "Success! Created a new product" });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
