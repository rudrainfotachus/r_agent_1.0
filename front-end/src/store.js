import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { billCreateReducer, billDateReducer, billDetailsReducers, billListReducer, billUpdateReducer } from './reducer/billsReducers';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducers';


const initialState={
    userSignin:{
        userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): null
    }
}
const reducer = combineReducers({
    billList: billListReducer,
    billDetails: billDetailsReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    billCreate: billCreateReducer,
    billUpdate: billUpdateReducer,
    billDateList:billDateReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;