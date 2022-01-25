import axios from 'axios'
const nftActions = {

    addOffer: (paramOffer) => {
        return async (dispatch, getState) => {

            try {
                const token = localStorage.getItem('token')
                const offer = await axios.post('https://proyectozzzz.herokuapp.com/api/offers', paramOffer, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                if (offer.data.response) {
                    dispatch({ type: 'ADD_OFFER', payload: offer.data.response })
                    return { success: true }
                } else {
                    return { success: false }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    getOffers: () => {
        return async (dispatch, getState) => {
            try {
                const offers = await axios.get('https://proyectozzzz.herokuapp.com/api/offers')
                dispatch({ type: 'GET_OFFERS', payload: offers.data.response })
            } catch (error) {
                console.log(error);
            }
        }
    },
    getOffersByUser: (userId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nfts = await axios.get(`https://proyectozzzz.herokuapp.com/api/offers/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'GET_USER_OFFERS', payload: nfts.data.response })
            } catch (error) {
                console.log(error);
            }
        }
    },
    getOffer: (nftId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const offer = await axios.get(`https://proyectozzzz.herokuapp.com/api/offer/${nftId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                return { nftId: offer.data.response }
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateOffer: (offerId, paramOffer) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const offer = await axios.put(`https://proyectozzzz.herokuapp.com/api/offer/${offerId}`, paramOffer, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                if (offer.data.offerUpdatedId) {
                    dispatch({ type: 'UPDATE_OFFER', payload: { offerId: offer.data.offerUpdatedId, body: paramOffer } })
                    return { success: true }
                } else {
                    return { success: false }
                }

            } catch (error) {
                console.log(error);
            }
        }
    },
    deleteOffer: (nftId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nft = await axios.delete(`https://proyectozzzz.herokuapp.com/api/offer/${nftId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'DELETE_OFFER', payload: nft.data.deletedNft })

            } catch (error) {
                console.log(error);
            }
        }
    },
    filter: (offers) => {
        return (dispatch, getState) => {
            dispatch({ type: 'FILTER_OFFERS', payload: offers })
        }
    }
}

export default nftActions