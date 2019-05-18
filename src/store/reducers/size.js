// import React, { Component } from 'react';
import { ADD_SIZE } from '../actions/actionTypes';

const initialState = {
    size: 0
};

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