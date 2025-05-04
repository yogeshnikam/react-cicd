const initialState = {
    loading: false,
    error: null,
    users: []
}

export const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'FETCH_USERS': 
            return {...state,loading: true}
        case 'FETCH_USERS_SUCCESS':
            return {...state, users: action.payload, loading: false}
        case 'FETCH_USERS_ERROR': 
            return {...state, loading: false, error: action.error}
        default: 
            return state
    }
}
