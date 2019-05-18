// import React, { Component } from 'react';
import { ADD_GAUGE } from '../actions/actionTypes';

const initialState = {
    gauge: 4.5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GAUGE:
            return {
                ...state,
                gauge: action.gauge
            }
      
        default:
            return state;
        
    }
};

export default reducer;