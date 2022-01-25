const mongoose = require("mongoose")

const nftSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    clase: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    features: {
        habilities: [
            {
                name: { type: String },
                damage: { type: Number }
            },
        ],
        hp: { type: Number },
        maxHp: { type: Number },
        usersFeatures: [{
            exp: { type: Number, default: 0 },
            level: { type: Number, default: 0 },
            userId: { type: mongoose.Types.ObjectId, ref: 'user' }
        }]
    },
    favs: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
})

const Nft = mongoose.model("nft", nftSchema)

module.exports = Nft