const initialState = {
    nfts: [],
    userNfts: [],
    aux: []
}

const nftReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_NFT':
            return {
                ...state,
                nfts: [...state.nfts, action.payload]
            }
        case 'GET_NFTS':
            return {
                ...state,
                nfts: action.payload,
                aux: action.payload
            }

        case 'DELETE_NFT':
            return {
                ...state,
                nfts: state.nfts.filter(nftId => nftId._id !== action.payload)

            }
        case 'UPDATE_NFT':
            return {
                ...state,
                nfts: state.nfts.map(nft => nft._id === action.payload.nftId ? { ...nft, ...action.payload.body } : nft)
            }
        case 'GET_USER_NFTS':
            return {
                ...state,
                userNfts: action.payload
            }
        case 'FILTER':
            const filtrado = action.payload.nfts.filter((nft => nft.name.toLowerCase().trim().startsWith(action.payload.value.toLowerCase())))
            return {
                ...state,
                nfts: filtrado
            }

        default:
            return state
    }

}

export default nftReducers