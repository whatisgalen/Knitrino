import { ADD_SIZE, ADD_GAUGE, SET_VARS } from './actionTypes';

export const addSize = (newSize)=>{
    return {
        type: ADD_SIZE,
        size: newSize
    };
};
export const addGauge = (newGauge)=>{
    return {
        type: ADD_GAUGE,
        gauge: newGauge
    };
};
export const setVars = (newVars)=>{
    //
    return {
        type: SET_VARS,
        vars: newVars
    };
};
