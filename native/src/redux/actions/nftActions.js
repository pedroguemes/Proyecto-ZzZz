import axios from 'axios'
const nftActions = {

    addNft: (paramNft) => {
        return async (dispatch, getState) => {

            try {
                const token = localStorage.getItem('token')
                const nft = await axios.post('http://localhost:4000/api/nft', paramNft, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                console.log(nft);
                dispatch({ type: 'ADD_NFT', payload: nft.data })
            } catch (error) {
                console.log(error);
            }
        }
    },
    getNfts: () => {
        return async (dispatch, getState) => {
            try {
                const nfts = await axios.get('http://localhost:4000/api/nft')
                dispatch({ type: 'GET_NFTS', payload: nfts.data.respuesta })
            } catch (error) {
                console.log(error);
            }
        }
    },
    getNftsByUser: (userId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nfts = await axios.get(`http://localhost:4000/api/nfts/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'GET_USER_NFTS', payload: nfts.data.response })
            } catch (error) {
                console.log(error);
            }
        }
    },
    getNft: (nftId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nft = await axios.get(`http://localhost:4000/api/nft/${nftId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                return { nftId: nft.data.respuesta }
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateNft: (nftId, paramUser) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nft = await axios.put(`http://localhost:4000/api/nft/${nftId}`, paramUser, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'UPDATE_NFT', payload: { nftId: nft.data.actualizado, body: paramUser } })
            } catch (error) {
                console.log(error);
            }
        }
    },
    deleteNft: (nftId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const nft = await axios.delete(`http://localhost:4000/api/nft/${nftId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'DELETE_NFT', payload: nft.data.deletedNft })

            } catch (error) {
                console.log(error);
            }
        }
    },
    filter: (nfts, value) => {
        return (dispatch, getState) => {
            dispatch({ type: 'FILTER', payload: { nfts, value } })
        }
    }
}

export default nftActions