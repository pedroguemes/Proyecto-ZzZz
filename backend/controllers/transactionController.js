const Transaction = require("../models/Transaction");



const transactionController = {

    postTransaction: async (req, res) => {
        const transactionBody = req.body
        let transaction
        try {
            if (req.user) {
                transaction = await new Transaction(transactionBody).save()
                res.json({ response: transaction })

            } else {
                res.json({ response: 'You must be logged in' })
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, respuesta: "Oops! error" })
        }
    },
    getMaxCreator: async (req, res) => {
        Transaction.aggregate(
            [

                { $match: {} },

                {
                    $group: {
                        "_id": "$userSeller",
                        "mount": { $sum: "$mount" }
                    },
                },
                {
                    $lookup: {
                        from: 'users',  // referencia al modelo users
                        localField: '_id', // toma el local de la consulta definido en $group ("_id")
                        foreignField: '_id', // toma el id forastero que viene del modelo users 
                        as: 'transaction' // nombre con el que se guarda la query
                    }
                },
                {
                    $sort: {
                        mount: -1
                    }
                }
            ],
            function (err, result) {
                res.json({ success: true, response: result })
            }
        );
    },
    getRecents: async (req, res) => {
        Transaction.aggregate(
            [
                { $match: {} },
                {
                    $sort: {
                        _id: -1
                    }
                },
                {
                    $lookup: {
                        from: 'nftoffers',
                        localField: 'nftOffer',
                        foreignField: '_id',
                        as: 'transaction'
                    }
                },
            ],
            function (err, result) {
                const proccecedData = result.map(element => {
                    let month = element.date.getMonth() + 1
                    let obj = {
                        ...element,
                        date: `${element.date.getDate()}/${month < 10 ? `0${month}` : month}`
                    }
                    return obj;
                })
                res.json({ success: true, response: proccecedData })
            }
        );
    },



}

module.exports = transactionController;