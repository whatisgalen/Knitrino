import { SET_VARS } from '../actions/actionTypes';
const initialState = { size: 36, gauge: 4.5 };
let castOn, underArmJoin, sleeveCastOn, sleeveMax, sleeveRows, increaseTimes, sleeveLength, yoke, yokeDepth;
function MRound(number, multipleOf) { let rounded = number; while(rounded % multipleOf != 0) { rounded % multipleOf >= (multipleOf/2) ? rounded++ : rounded--; } return rounded;}
function castOn(size, gauge) { return MRound(Math.round(size * gauge), 4);}
function underArmJoin(castOn) { return MRound( Math.round(castOn * 0.08), 2);}
function sleeveCastOn(castOn) { return MRound(Math.round(castOn/5), 4);}
function sleeveMax(castOn) { let sleeveMax = Math.round(castOn * 0.333333); if(sleeveMax % 2 != 0) {sleeveMax++;} return sleeveMax;}
function sleeveRows(gauge) { return MRound(((18-13.1)*Math.round(gauge/0.73)), 2);}
function increaseTimes(sleeveMax, sleeveCastOn) { return Math.round((sleeveMax - sleeveCastOn)/ 2);}
function sleeveLength(size) { if(size <= 44) {return 18;} else if(size > 50) { return 19.75;} else { return 19; }}
function yoke(castOn, underArmJoin, sleeveMax) { return MRound( Math.round(castOn - (2* underArmJoin)+(2*(sleeveMax - underArmJoin))), 2 );}
function yokeDepth(yoke, gauge) { return Math.round((yoke / gauge)/4);}
const reducer = (state = initialState, action) => {
    castOn = castOn(state.size, state.gauge);
    underArmJoin = underArmJoin(castOn);
    sleeveCastOn = sleeveCastOn(castOn);
    sleeveMax = sleeveMax(castOn);
    sleeveRows = sleeveRows(state.gauge);
    increaseTimes = increaseTimes(sleeveMax, sleeveCastOn);
    sleeveLength = sleeveLength(state.size);
    yoke = yoke(castOn, underArmJoin, sleeveMax);
    yokeDepth = yokeDepth(yoke, state.gauge);

    switch (action.type) {
        case SET_VARS:
            return {
                ...state,
                castOn: castOn,
                underArmJoin: underArmJoin,
                sleeveCastOn: sleeveCastOn,
                sleeveMax: sleeveMax,
                sleeveRows: sleeveRows,
                increaseTimes: increaseTimes,
                sleeveLength: sleeveLength,
                yoke: yoke,
                yokeDepth: yokeDepth
            };
        default:
            return state;
    }
};
export default reducer;