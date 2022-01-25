const initialState = {
    user: '',
    users: []
}

const userReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'USER_LOGGED':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...initialState,
            }
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'DELETE_USERS':
            return {
                ...state,
                users: state.users.filter(userDB => userDB._id !== action.payload)
            }
        case 'UPDATE_USER':
            return {
                user: {...state.user, ...action.payload}
            }
        default:
            return state
    }


}

export default userReducers