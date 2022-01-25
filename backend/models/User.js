const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, default: " " },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userImg: { type: String, required: true },
    phone: { type: Number, required: true },
    google: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    suscription: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
})

const User = mongoose.model('user', userSchema)

module.exports = User