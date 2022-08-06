import mongoose from 'mongoose'

const cardCazareSchema = new mongoose.Schema({
  adresa: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    nume: {
        type: String,
        required: true
    },
    pret: {
        type: Number,
        required: true
    },
    descriere:{
        type: String,

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

let Dataset = mongoose.models.cardCazare || mongoose.model('cardCazare', cardCazareSchema)

export default Dataset