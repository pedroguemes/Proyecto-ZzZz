import axios from 'axios'
const transactionActions = {

    addTransaction: (bodyTransaction) => {
        return async (dispatch, getState) => {

            try {
                const token = localStorage.getItem('token')
                const transaction = await axios.post('http://localhost:4000/api/transactions', bodyTransaction, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                if (offer.data.response) {
                    dispatch({ type: 'ADD_TRANSACTION', payload: transaction.data.response })
                    return { success: true }
                } else {
                    return { success: false }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
}

export default transactionActions