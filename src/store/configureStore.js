import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import sizeReducer from './reducers/size';
import gaugeReducer from './reducers/gauge';
import varsReducer from './reducers/vars';

const rootReducer = combineReducers({
    size: sizeReducer,
    gauge: gaugeReducer,
    // vars: varsReducer
});
let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore=()=>{ return createStore(rootReducer, composeEnhancers()); };
export default configureStore;