const initialState = {
    recents: [],
    topCreators: [],
    transactions: [] // por el momento no se toca
}

const transactionReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'GET_RECENTS':
            return {
                ...state,
                recents: action.payload
            }
        case 'GET_TOP_CREATOR':
            return {
                ...state,
                topCreators: action.payload
            }
        default:
            return state
    }

}

export default transactionReducers