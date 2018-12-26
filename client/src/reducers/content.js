import * as types from './../constants/actionTypes'

var initialState = '';

const content = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CONTEXT_SUCCESS:
            state = action.content;
            return state;
            
        default:
            return state;
    }
}

export default content;