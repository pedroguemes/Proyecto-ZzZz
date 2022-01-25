const mongoose = require("mongoose")

const nftOfferSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    clase: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    description: { type: String },
    valid: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now },
    public: { type: Boolean, default: false } // cuando la crea el user cambia a true, cuando se vende cambia a false (deberia haber un boton para publicar)
})

const NftOffer = mongoose.model("nftoffer", nftOfferSchema)

module.exports = NftOffer