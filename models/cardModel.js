import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
  locatie: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    descriere: {
        type: String,
        required: true
    },
    descriere_scurta: {
        type: String,
        required: true
    },
    link:{
        type: String,

    },
    images: {
        type: Array,
        required: true
    }
  
}, {
    timestamps: true
})

let Dataset = mongoose.models.card || mongoose.model('card', cardSchema)

export default Dataset