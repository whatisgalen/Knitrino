import { ADD_SIZE } from '../actions/actionTypes';
const initialState = { size: 36 };
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SIZE:
            return {
                ...state,
                size: action.size
            };
        default:
            return state;
    }
};
export default reducer;