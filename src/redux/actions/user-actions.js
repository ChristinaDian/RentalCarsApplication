import { deleteUser, getAllUsers, getUserById, saveUser } from "../../utils/http-utils/user-requests"
import { DELETE_USER, EDIT_USER, GET_ALL_USERS, GET_USER_BY_ID, SAVE_USER } from "../action-types/user-action-types";

export function getAllUsersFromAPI() {
    return dispatch => {
        getAllUsers().then(response => {
            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            });
        });
    }
}

export function deleteUserFromAPI(id) {
    return dispatch => {
        deleteUser(id).then(_ => {
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        })
    }
}

export function getUserByIdFromAPI(id) {
    return dispatch => {
        getUserById(id).then(response => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: response.data
            });
        })
    }
}

export function editUser(userData) {
    return dispatch => {
        dispatch({
            type: EDIT_USER,
            payload: userData
        });
    }
}

export function saveUserinAPI(user) {
    return dispatch => {
        saveUser(user).then(_ => {
            dispatch({
                type: SAVE_USER,
                payload: user
            });
        });
    }
}