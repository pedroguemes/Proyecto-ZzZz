import axios from 'axios'
const userActions = {

    addUser: (paramUser) => {
        return async (dispatch, getState) => {
            try {
                const user = await axios.post('http://localhost:4000/api/auth/signUp', paramUser)
                if (user.data.success && !user.data.error) {
                    localStorage.setItem('token', user.data.response.token)
                    dispatch({ type: 'USER_LOGGED', payload: user.data.response })
                    return { succes: true, userId: user.data.response._doc._id }
                } else {
                    return { succes: false, error: user.data.error }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    deleteUser: (userId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.delete(`http://localhost:4000/api/admin/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'DELETE_USER', payload: res.data.deletedId })

                return res.data.users
            } catch (error) {
                return { msg: 'You must be login' }
            }

        }
    },
    updateUser: (userId) => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const user = await axios.put(`http://localhost:4000/api/admin/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'UPDATE_USER', payload: user.data.response })

            } catch (error) {
                return { msg: 'You must be login' }
            }

        }
    },

    editUser: (userId, user) => {
        
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const editedUser = await axios.put(`http://localhost:4000/api/admin/user/${userId}`, user, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'UPDATE_USER', payload: editedUser.data.response })

            } catch (error) {
                return { msg: 'You must be login' }
            }

        }
    },

    signIn: (users) => {
        return async (dispatch, getState) => {
            try {
                const user = await axios.post('http://localhost:4000/api/auth/signIn', users)
                if (user.data.success && !user.data.error) {
                    localStorage.setItem('token', user.data.response.token)
                    dispatch({ type: 'USER_LOGGED', payload: user.data.response._doc })
                    return { succes: true, userId: user.data.response._doc._id }
                } else {
                    return { succes: false, error: user.data.error }
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    isAuth: () => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const user = await axios.get('http://localhost:4000/api/user/auth', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                console.log(user)
                dispatch({ type: 'usuario', payload: user.data.response })
                return { response: user.data.response }
            } catch (error) {
                return { error: 'Unauthorized user, try login again' }
            }
        }
    },
    logout: () => {
        return async (dispatch, getState) => {
            localStorage.removeItem('token')
            dispatch({ type: 'LOGOUT' })
        }
    },
    favs: (favs) => {
        return async (dispatch, getState) => {
            try{
                const token = localStorage.getItem('token')
                const user = await axios.put('http://localhost:4000/api/favs',{...favs},{
                        headers: { 'Authorization': 'Bearer ' + token }
                    })
                console.log(user)
                return {success : true}
            }catch(err){
                console.log(err)
            }
        }
    },
    logInAsync: (token) => {
        return async (dispatch, getState) => {
            try {
                let user = await axios.get("http://localhost:4000/api/user/auth", {
                headers: { Authorization: 'Bearer '+ token }
                
                 })
                
                dispatch({type: 'USER_LOGGED', payload: user.data.response})
                return { response: user.data.response } 
            } catch (error) {
                dispatch ({type: "LOG_OUT"})
                return { error: 'Unauthorized user, try login again' }
            } 
        }
    }
}

export default userActions