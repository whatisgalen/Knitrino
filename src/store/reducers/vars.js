import { SET_VARS } from '../actions/actionTypes';
const initialState = { size: 36, gauge: 4.5 };
// console.log(initialState);
let castOn, underArmJoin, sleeveCastOn, sleeveMax, sleeveRows, increaseTimes, sleeveLength, yoke, yokeDepth;
function MRound(number, multipleOf) { let rounded = number; while(rounded % multipleOf != 0) { rounded % multipleOf >= (multipleOf/2) ? rounded++ : rounded--; } return rounded;}
function CastOn(size, gauge) { return MRound(Math.round(size * gauge), 4);}
function UnderArmJoin(castOn) { return MRound( Math.round(castOn * 0.08), 2);}
function SleeveCastOn(castOn) { return MRound(Math.round(castOn/5), 4);}
function SleeveMax(castOn) { let sleeveMax = Math.round(castOn * 0.333333); if(sleeveMax % 2 != 0) {sleeveMax++;} return sleeveMax;}
function SleeveRows(gauge) { return MRound(((18-13.1)*Math.round(gauge/0.73)), 2);}
function IncreaseTimes(sleeveMax, sleeveCastOn) { return Math.round((sleeveMax - sleeveCastOn)/ 2);}
function SleeveLength(size) { if(size <= 44) {return 18;} else if(size > 50) { return 19.75;} else { return 19; }}
function Yoke(castOn, underArmJoin, sleeveMax) { return MRound( Math.round(castOn - (2* underArmJoin)+(2*(sleeveMax - underArmJoin))), 2 );}
function YokeDepth(yoke, gauge) { return Math.round((yoke / gauge)/4);}
const reducer = (state = initialState, action) => {
    castOn = CastOn(state.size, state.gauge);
    underArmJoin = UnderArmJoin(castOn);
    sleeveCastOn = SleeveCastOn(castOn);
    sleeveMax = SleeveMax(castOn);
    sleeveRows = SleeveRows(state.gauge);
    increaseTimes = IncreaseTimes(sleeveMax, sleeveCastOn);
    sleeveLength = SleeveLength(state.size);
    yoke = Yoke(castOn, underArmJoin, sleeveMax);
    yokeDepth = YokeDepth(yoke, state.gauge);
    // console.log(castOn + "" + underArmJoin + ""+ yoke);

    switch (action.type) {
        case SET_VARS:
            return {
                ...state,
                vars: state.vars.concat({
                    castOn: castOn,
                    underArmJoin: underArmJoin,
                    sleeveCastOn: sleeveCastOn,
                    sleeveMax: sleeveMax,
                    sleeveRows: sleeveRows,
                    increaseTimes: increaseTimes,
                    sleeveLength: sleeveLength,
                    yoke: yoke,
                    yokeDepth: yokeDepth
                })
                // castOn: castOn,
                // underArmJoin: underArmJoin,
                // sleeveCastOn: sleeveCastOn,
                // sleeveMax: sleeveMax,
                // sleeveRows: sleeveRows,
                // increaseTimes: increaseTimes,
                // sleeveLength: sleeveLength,
                // yoke: yoke,
                // yokeDepth: yokeDepth
            };
        default:
            return state;
    }
};
export default reducer;