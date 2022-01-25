const initialState = {
    cart:[],
    total:0
}

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NFT_TO_CART':
            let newItem = action.payload.nfts.find(element =>  element._id === action.payload.id )
            return {
                ...state,
                cart:[...state.cart , newItem]
            }
        case 'REMOVE_NFT_TO_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload)
            }
        case 'REMOVE_ALL_FROM_CART':
            return {
                ...state,
                cart:[]
            }
        case 'TOTAL_PRICE_CART':
            return {
                ...state,
                total: action.payload
            }
        default:
            return state
    }

}

export default cartReducers