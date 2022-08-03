import connectDB from '../../../utils/connectDB'
import Card from '../../../models/cardModel'
// import auth from '../../../middleware/auth'

connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getCards(req, res)
            break;
        case "POST":
            await createCard(req, res)
            break;
    }
}

// class APIfeatures {
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;
//     }
//     filtering(){
//         const queryObj = {...this.queryString}

//         const excludeFields = ['page', 'sort', 'limit']
//         excludeFields.forEach(el => delete(queryObj[el]))

//         if(queryObj.category !== 'all')
//             this.query.find({category: queryObj.category})
//         if(queryObj.title !== 'all')
//             this.query.find({title: {$regex: queryObj.title}})

//         this.query.find()
//         return this;
//     }

//     sorting(){
//         if(this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join('')
//             this.query = this.query.sort(sortBy)
//         }else{
//             this.query = this.query.sort('-createdAt')
//         }

//         return this;
//     }

//     paginating(){
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 6
//         const skip = (page - 1) * limit;
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }
// }

const getCards = async (req, res) => {
    try {
        // const features = new APIfeatures(Products.find(), req.query)
        // .filtering().sorting().paginating()

        // const products = await features.query

        const cards = await Card.find()

        res.json({cards})


    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createCard = async (req, res) => {
    try {
        // const result = await auth(req, res)
        // if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const {locatie, rating, descriere, descriere_scurta, images} = req.body

        const newCard = new Card({
          locatie, rating, descriere, descriere_scurta, images
        })

        await newCard.save()

        res.json({msg: 'Success! Created a new product'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}