import * as types from './../constants/actionTypes'

import callApi from './../api/index'


export const actFetchUsersRequest = () => {
    return dispatch => {
        return callApi('','GET', null).then(res => {
            dispatch(actFetchUsers(res.data));
        });
    };
}

export const actFetchUsers = (users) => {
    return {
        type : types.FETCH_USERS,
        users
    }
}

export const actAddUserRequest = (user) => {
    return dispatch => {
        return callApi('','POST', user).then(res => {
            dispatch(actAddUser(res.data));
        });
    };
}

export const actAddUser = (user) => {
    return {
        type : types.ADD_USER,
        user
    }
}

export const actUpdateUserRequest = (user) => {
    return dispatch => {
        return callApi(`${user._id}`, 'PUT', user).then(res => {
            dispatch(actUpdateUser(res.data));
        });
    };
}

export const actUpdateUser = (user) => {
    return {
        type : types.UPDATE_USER,
        user
    }
}