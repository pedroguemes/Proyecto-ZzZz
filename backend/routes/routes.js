const Router = require("express").Router();
const validador = require("../config/validador");
const controllerUser = require('../controllers/controllerUser');
const NftControllers = require("../controllers/NftController");
const offerNftController = require('../controllers/offerNftController')
const transactionController = require('../controllers/transactionController')
const passport = require('../config/passport')
const { newUser, userLoged, authUser, favs, getUsers, updateUser, getUsersByDay, getSuscriptionByDay } = controllerUser;
const { getAllNft, loadUnNft, modifyAnNft, getOneNft, deleteNft, getNftsByUser } = NftControllers;
const { getAllOffers, postOffer, modifyOffer, getOneOffer, deleteOffer, getOffersByUser, getOffersByDay } = offerNftController
const { getRecents, postTransaction, getMaxCreator } = transactionController

// stadistics controllers
Router.route('/usersByDay')
    .get(getUsersByDay)
Router.route('/suscriptionByDay')
    .get(getSuscriptionByDay)
Router.route('/offersByDay')
    .get(getOffersByDay)

// Routes of NFT

Router.route('/nft')
    .get(getAllNft)
    .post(passport.authenticate('jwt', { session: false }), loadUnNft)
Router.route("/nft/:id")
    .get(getOneNft)
    .put(passport.authenticate('jwt', { session: false }), modifyAnNft)
    .delete(passport.authenticate('jwt', { session: false }), deleteNft)

// Routes of Users

Router.route('/auth/signUp')
    .post(validador, newUser)

Router.route('/auth/signIn')
    .post(userLoged)

// Router.route('/users/:id')
//     .get(getAllUsers)

Router.route('/nfts/user/:id')
    .get(passport.authenticate('jwt', { session: false }), getNftsByUser)

Router.route('/offers/user/:id')
    .get(passport.authenticate('jwt', { session: false }), getOffersByUser)

Router.route('/user/auth')
    .get(passport.authenticate('jwt', { session: false }), authUser)

Router.route('/admin/users')
    .get(passport.authenticate('jwt', { session: false }), getUsers)
Router.route('/admin/user/:id')
    .put(passport.authenticate('jwt', { session: false }), updateUser)
// Favs

Router.route('/favs')
    .put(passport.authenticate('jwt', { session: false }), favs)

// Offer ROUTES
Router.route('/offers')
    .get(getAllOffers) // publica pero depende del valid (se ve en el controlador)
    .post(passport.authenticate('jwt', { session: false }), postOffer)

Router.route("/offer/:id")
    .get(getOneOffer)
    .put(passport.authenticate('jwt', { session: false }), modifyOffer)
    .delete(passport.authenticate('jwt', { session: false }), deleteOffer)


// TRANSACTION 
Router.route('/recents')
    .get(getRecents)
Router.route('/transactions')
    .post(passport.authenticate('jwt', { session: false }), postTransaction)
    .get(getMaxCreator)
module.exports = Router