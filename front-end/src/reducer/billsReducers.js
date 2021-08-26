import { BILL_CREATE_FAIL, BILL_CREATE_REQUEST, BILL_CREATE_RESET, BILL_CREATE_SUCCESS, BILL_DATE_FAIL, BILL_DATE_REQUEST, BILL_DATE_SUCCESS, BILL_DETAILS_FAIL, BILL_DETAILS_REQUEST, BILL_DETAILS_SUCCESS, BILL_LIST_FAIL, BILL_LIST_REQUEST, BILL_LIST_SUCCESS, BILL_UPDATE_FAIL, BILL_UPDATE_REQUEST, BILL_UPDATE_RESET, BILL_UPDATE_SUCCESS } from "../constants/billsConstants";

export const billListReducer = (state = { bills: []}, action) =>{
    switch(action.type){
        case BILL_LIST_REQUEST:
            return {loading: true};
        case BILL_LIST_SUCCESS:
            return {loading: false, bills: action.payload}
        case BILL_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}

export const billDateReducer = (state = { bills: []}, action) =>{
    switch(action.type){
        case BILL_DATE_REQUEST:
            return {loading: true};
        case BILL_DATE_SUCCESS:
            return {loading: false, bills: action.payload}
        case BILL_DATE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}


export const billDetailsReducers = (state = {loading:true}, action) =>{
    switch (action.type){
        case BILL_DETAILS_REQUEST:
            return {loading: true};
        case BILL_DETAILS_SUCCESS:
            return {loading: false, bill: action.payload}
        case BILL_DETAILS_FAIL:
            return {loading : false, error: action.payload}
        default:
            return state
    }
}

export const billCreateReducer = (state={},action) =>{
    switch(action.type){
        case BILL_CREATE_REQUEST:
            return{loading:true}
        case BILL_CREATE_SUCCESS:
            return {loading: false, success:true, bill:action.payload}
        case BILL_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case BILL_CREATE_RESET:
            return {};
        default: 
          return state
    }
}

export const billUpdateReducer = (state = {}, action) =>{
    switch(action.type){
        case BILL_UPDATE_REQUEST:
            return{loading: true};
        case BILL_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case BILL_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case BILL_UPDATE_RESET:
            return{}
        default:
            return state
    }
    

}