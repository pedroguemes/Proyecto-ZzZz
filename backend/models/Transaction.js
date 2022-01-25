const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    userBuyer: { type: mongoose.Types.ObjectId, ref: 'user' },
    userSeller: { type: mongoose.Types.ObjectId, ref: 'user' },
    nftOffer: { type: mongoose.Types.ObjectId, ref: 'nftoffer' },
    date: { type: Date, default: Date.now },
    mount: { type: Number, required: true },
})

const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction
// mongoose === query db
// - la solicitud sera, traer un array con los userSeller con mas mount
// - Recent se debe hacer una query a la base de datos