import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { billDetailsReducers, billListReducer } from './reducer/billsReducers';


const initialState={}
const reducer = combineReducers({
    billList: billListReducer,
    billDetails: billDetailsReducers,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;