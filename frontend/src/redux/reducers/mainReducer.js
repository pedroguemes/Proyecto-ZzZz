import { combineReducers } from "redux"
import userReducers from './userReducers'
import nftReducers from './nftReducers'
import cartReducers from './cartReducers'
import offerReducers from './offerReducers'
import transactionReducers from './transactionReducers'


const mainReducer = combineReducers({
    userReducers,
    nftReducers,
    offerReducers,
    cartReducers,
    transactionReducers
})

export default mainReducer