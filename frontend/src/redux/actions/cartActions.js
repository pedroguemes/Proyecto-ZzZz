import axios from 'axios'
const cartActions = {
    addNftToCart: (id, nfts) => {
        return (dispatch, getState) => {
            dispatch({ type: 'ADD_NFT_TO_CART', payload:{id:id, nfts:nfts}})
        }
    },
    removeOneFromCart: (id) => {
        return (dispatch, getState) => {
            dispatch({ type: 'REMOVE_NFT_TO_CART', payload:id })
        }
    },

    removeAllFromCart: () => {
        return (dispatch, getState) => {
            dispatch({ type: 'REMOVE_ALL_FROM_CART' })
        }
    },
    setTotalPrice: (total) => {
        return (dispatch, getState) => {
            dispatch({ type : 'TOTAL_PRICE_CART', payload:total })
        }
    }
}

export default cartActions