const NftOffer = require("../models/NftOffer");

const offerNftController = {


    getOffersByDay: async (req, res) => {
        NftOffer.aggregate(
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
    getAllOffers: async (req, res) => {
        try {
            const offers = await NftOffer.find().populate('user')
            res.json({ success: true, response: offers })
        } catch (error) {
            res.json({ success: false, respuesta: "Oops! error" })
        }
    },
    // controlador privado dependiendo de la suscripcion 
    postOffer: async (req, res) => {
        const offerBody = req.body
        let offer
        try {
            if (req.user.role === 'admin' || req.user.role === 'moderator' || req.user.suscription) {
                offer = await new NftOffer(offerBody).save()
                res.json({ response: offer })
            } else {
                res.json({ success: false })
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, respuesta: "Oops! error" })
        }
    },
    getOneOffer: async (req, res) => {
        let offer;
        const id = req.params.id;
        try {
            offer = await NftOffer.findOne({ _id: id }).populate('user')
            res.json({ response: offer, success: true });
        } catch (error) {

            res.json({ success: false, respuesta: "Oops! error" })
        }
    },
    // controlador privado, dependiendo de la suscription
    modifyOffer: async (req, res) => {
        let id = req.params.id;
        let offerBody = req.body;
        let offer;
        try {
            if (req.user.role === 'admin' || req.user.role === 'moderator' || req.user.suscription) {

                if (req.user.role === 'user') {
                    // no debe permitir cambiar la validez de la oferta 
                    if (!req.body.valid) {
                        offer = await NftOffer.findOneAndUpdate({ _id: id }, offerBody, { new: true });
                        res.json({ offerUpdatedId: offer._id })
                    } else {
                        res.json({ msg: 'Error' })
                    }
                } else {
                    offer = await NftOffer.findOneAndUpdate({ _id: id }, offerBody, { new: true });
                    res.json({ offerUpdatedId: offer._id })
                }

            } else {
                res.json({ success: false })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // controlador privado, dependiendo de la suscription
    deleteOffer: async (req, res) => {
        const id = req.params.id;
        let offerDeleted;
        try {

            const offer = await NftOffer.findOne({ _id: id })
            if (req.user.role === 'admin' || req.user.role === 'moderator' || req.user.suscription) {

                if (req.user.role === 'user') {
                    // no debe permitir cambiar la validez de la oferta 
                    if (offer.user.toString() === req.user._id.toString()) {
                        offerDeleted = await NftOffer.findOneAndDelete({ _id: id });
                        res.json({ offerUpdatedId: offer._id })
                    } else {
                        res.json({ msg: 'Error' })
                    }
                } else if (req.user.role === 'admin' || req.user.role === 'moderator') {
                    offerDeleted = await NftOffer.findOneAndDelete({ _id: id });
                    res.json({ offerUpdatedId: offerDeleted._id })
                }

            } else {
                res.json({ success: false })
            }
        } catch (error) {
            console.log(error);
        }

    },
    getOffersByUser: async (req, res) => {
        const id = req.params.id
        try {
            if (req.user.role === 'admin' || req.user.role === 'moderator' || req.user.suscription) {
                const offersByUser = await NftOffer.find({ user: id }).populate('user')
                res.json({ succes: true, response: offersByUser })

            } else {
                res.json({ succes: false, msg: 'Unauthorized user' })
            }

        } catch (error) {
            console.log(error);
            res.json({ error: 'Error in the comunication' })
        }
    },


}

module.exports = offerNftController;