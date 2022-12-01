import { DELETE_USER, EDIT_USER, GET_ALL_USERS, GET_USER_BY_ID, SAVE_USER } from "../action-types/user-action-types";

const defaultUser ={
        name: '',
        email: '',
        phone: ''
}
const initialState = {
    users: [],
    user: { ...defaultUser }
}

export function usersReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, users: action.payload };
        case DELETE_USER: 
            return { ...state, users: state.users.filter(user => user.id !== action.payload) };
        case GET_USER_BY_ID:
            return { ...state, user: action.payload };
        case EDIT_USER:
            return { ...state, user: { ...state.user, ...action.payload}}
        case SAVE_USER:
            return { ...state, user: { ...defaultUser }, users: [ ...state.users.filter(user => user.id !== action.payload.id), action.payload] }
        default:
            return state;
    }
}