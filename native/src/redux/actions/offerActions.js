import axios from 'axios'
const nftActions = {

    addOffer: (paramOffer) => {
        return async (dispatch, getState) => {

            try {
                const token = localStorage.getItem('token')
                const offer = await axios.post('http://localhost:4000/api/offers', paramOffer, {
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
                const offers = await axios.get('http://localhost:4000/api/offers')
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
                const nfts = await axios.get(`http://localhost:4000/api/offers/user/${userId}`, {
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
                const offer = await axios.get(`http://localhost:4000/api/offer/${nftId}`, {
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
                const offer = await axios.put(`http://localhost:4000/api/offer/${offerId}`, paramOffer, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                console.log(offer)
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
                const nft = await axios.delete(`http://localhost:4000/api/offer/${nftId}`, {
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