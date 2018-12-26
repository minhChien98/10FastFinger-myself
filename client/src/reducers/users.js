import * as types from './../constants/actionTypes'

var initialState = [];

const users = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case types.FETCH_USERS:
            state = action.users;
            return state;
        case types.ADD_USER:
            localStorage.setItem('user', JSON.stringify(action.user));
            state.push(action.user);
            return [...state];
        case types.UPDATE_USER:
            index = findIndex(state,action.user.id)
            state[index] = action.user;
            return [...state]
        default:
            return state;
    }
}

const findIndex = (users,id)=>{
    let result = -1;
    users.forEach((user,index) => {
        if(user._id === id){
            result = index;
        }
    });
    return result;
}

export default users;