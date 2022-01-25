const initialState = {
    auxOffers: [],
    auxOffertsDos: [],
    userOffers: [],
    offers: []
}

const offerReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_OFFER':
            return {
                ...state,
                offers: [...state.offers, action.payload],
                auxOffers: [...state.offers, action.payload]
            }
        case 'GET_OFFERS':
            let arrayAcepted = action.payload.filter(card => card.valid === "accepted")
            return {
                ...state,
                offers: action.payload,
                auxOffers: action.payload,
                auxOffertsDos: arrayAcepted
            }
        case 'GET_OFFER':
            return {
                ...state,
                auxOffers: action.payload,
                offers: action.payload
            }
        case 'DELETE_OFFER':
            return {
                ...state,
                offers: state.offers.filter(offerId => offerId._id !== action.payload), // fast
                // userOffers: state.userOffers.filter(offerId => offerId._id !== action.payload) // lento, porque existe un for dentro de otro , primero recorre el array de offers totales para encontrar la oferta, y luego otro array de las ofertas del usuario, convirtiendose en una funcion de O(n) y no O(n^2), lo que implica un menor costo

            }
        case 'UPDATE_OFFER':
            return {
                ...state,
                offers: state.offers.map(offer => offer._id === action.payload.offerId ? { ...offer, ...action.payload.body } : offer),
                userOffers: state.userOffers.map(offer => offer._id === action.payload.offerId ? { ...offer, ...action.payload.body } : offer)
            }
        case 'GET_USER_OFFERS':
            return {
                ...state,
                userOffers: action.payload
            }
        case 'FILTER_OFFERS':
            return {
                ...state,
                offers: action.payload
            }

        default:
            return state
    }

}

export default offerReducers