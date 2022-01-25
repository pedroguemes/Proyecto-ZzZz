const User = require('../models/User')
const Nft = require("../models/Nft");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const controllerUser = {
    getUsersByDay: async (req, res) => {
        User.aggregate(
            [
                {
                    $group: {
                        "_id": {
                            "year": { "$year": "$date" },
                            "month": { "$month": "$date" },
                            "day": { "$dayOfMonth": "$date" }
                        },
                        "count": { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ],
            function (err, result) {
                const procceced = result.map(element => {
                    let obj = {
                        date: `${element._id.day}/${element._id.month}/${element._id.year}`,
                        value: element.count
                    }
                    return obj
                })
                //  se deja el objeto listo para enviar al grafico
                res.json({ data: procceced })
            }
        );
    },
    getSuscriptionByDay: async (req, res) => {
        User.aggregate(
            [
                {
                    $group: {
                        "_id": {
                            date: {
                                "year": { "$year": "$date" },
                                "month": { "$month": "$date" },
                                "day": { "$dayOfMonth": "$date" }
                            },
                            subscription: "$suscription"
                        },
                        "count": { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ],
            function (err, result) {
                const filteredResult = result.filter(element => element._id.subscription)

                const procceced = filteredResult.map(element => {

                    let obj = {
                        date: `${element._id.date.day}/${element._id.date.month}/${element._id.date.year}`,
                        value: element.count
                    }
                    return obj

                })
                //  se deja el objeto listo para enviar al grafico
                res.json({ data: procceced })
            }
        );
    },
    newUser: async (req, res) => {

        let { name, lastName, email, password, userImg, phone, google, rol } = req.body

        try {
            const usuarioExiste = await User.findOne({ email })
            if (usuarioExiste) {
                return res.json({ success: false, error: "The user already exists" })
            } else {

                const contraseñaHasheada = bcryptjs.hashSync(password, 10)

                const nuevoUsuario = new User({
                    name,
                    lastName,
                    email,
                    password: contraseñaHasheada,
                    userImg,
                    phone,
                    google,
                    rol
                })
                await nuevoUsuario.save()
                const token = jwt.sign({ ...nuevoUsuario }, process.env.SECRET_KEY)
                return res.json({ success: true, response: { token, ...nuevoUsuario }, error: null })
            }
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
    
    userLoged: async (req, res) => {
        const { email, password } = req.body
        if (email == '' || password == '') {
            return res.json({ success: true, error: "Fields cannot be left empty" })
        }
        try {
            const usuarioExiste = await User.findOne({ email })
            if (!usuarioExiste) {
                res.json({ success: false, error: "Mail does not exist" })
            } else {
                let contraseñaCoincide = bcryptjs.compareSync(password, usuarioExiste.password)
                if (contraseñaCoincide || password === usuarioExiste.password) {
                    const token = jwt.sign({ ...usuarioExiste }, process.env.SECRET_KEY)
                    res.json({ success: true, response: { token, ...usuarioExiste }, error: null })
                } else {
                    res.json({ success: false, error: "The password is incorrect" })
                }
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, response: null, error: error })
        }
    },
    authUser: (req, res) => {
        try {
            const userAuth = req.user
            res.json({ success: true, response: userAuth, error: null })
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
    getUsers: async (req, res) => {
        try {
            if (req.user.role === 'admin' || req.user.role === 'moderator') {
                const users = await User.find()
                res.json({ success: true, users })
            } else {
                res.json({ success: false, error: 'Unauthorized User, you must be an admin' })
            }
        } catch (error) {

            res.json({ success: false, response: null, error: error })
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id
        const userBody = req.body
        let userUpdated
        try {
            if (req.user.role === 'admin' || req.user.role === 'moderator') {
                if (req.user.role === 'moderator' && id !== req.user.id) {
                    userUpdated = await User.findOneAndUpdate({ _id: id }, userBody, { new: true })
                    res.json({ success: true, response: userUpdated })
                } else if (req.user.role === 'admin') {
                    userUpdated = await User.findOneAndUpdate({ _id: id }, userBody, { new: true })
                    res.json({ success: true, response: userUpdated })

                } else {
                    res.json({ success: false, response: null })
                }
            } else if (req.user.role === 'user') {
                if (!userBody.role) {
                    userUpdated = await User.findOneAndUpdate({ _id: req.user._id }, userBody, { new: true })
                    res.json({ success: true, response: userUpdated })
                } else {
                    res.json({ success: false })
                }

            } else {
                res.json({ success: false, error: 'Unauthorized User, you must be an admin' })
            }
        } catch (error) {
            console.log('error');
            res.json({ success: false, response: null, error: error })
        }
    },
    favs: async (req, res) => {
        const { nftId, bool } = req.body
        try {
            const nft = await Nft.findOneAndUpdate(
                { _id: nftId },
                bool ?
                    { $addToSet: { favs: req.user._id } }
                    :
                    { $pull: { favs: req.user._id } },
                { new: true }
            )
            res.json({ success: true, response: { nft: nft }, error: null })
        } catch (error) {
            console.log(error)
        }
    },
    editUser: async (req, res) => {
        let id = req.params.id
        let user = req.body
        let update
        try {
            update = await User.findOneAndUpdate({ _id: id }, user, { new: true })
        } catch (error) {
            console.error(error)
        }
        res.json({ success: update ? true : false })
    },
}

module.exports = controllerUser;