import { BILL_CREATE_FAIL, BILL_CREATE_REQUEST, BILL_CREATE_SUCCESS, BILL_DATE_FAIL, BILL_DATE_REQUEST, BILL_DATE_SUCCESS, BILL_DETAILS_FAIL, BILL_DETAILS_REQUEST, BILL_DETAILS_SUCCESS, BILL_LIST_FAIL, BILL_LIST_REQUEST, BILL_LIST_SUCCESS, BILL_UPDATE_FAIL, BILL_UPDATE_REQUEST, BILL_UPDATE_SUCCESS } from "../constants/billsConstants"
import Axios from 'axios'

export const listBills = ({customerName = ''})  => async (dispatch) =>{
    
    dispatch({
        type: BILL_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get(`/api/bills?&customerName=${customerName}`);
        dispatch({type:BILL_LIST_SUCCESS, payload: data})
    } catch (error){
        dispatch({type:BILL_LIST_FAIL, payload: error.message})

    }
}

export const listDateBills = () => async (dispatch) =>{
    dispatch({
        type: BILL_DATE_REQUEST
    });

    try{
        const {data} = await Axios.get('http://localhost:4000/api/bills/date');
        console.log(data)
        dispatch({type:BILL_DATE_SUCCESS, payload: data})
    } catch (error){
        dispatch({type:BILL_DATE_FAIL, payload: error.message})

    }
}
// single bill details
export const detailsBill = (billId) => async (dispatch) =>{
    dispatch({type: BILL_DETAILS_REQUEST, payload: billId})
    try{
        
        const {data} = await Axios.get(`/api/bills/bill/${billId}`)
        dispatch({type:BILL_DETAILS_SUCCESS, payload: data})
    } catch (error){
        dispatch({
            type:BILL_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createBill = () => async(dispatch, getState)=>{
 dispatch({type: BILL_CREATE_REQUEST});
//  const { userSignin:{userInfo}} = getState() 
 try{
    const {data} = await Axios.post('/api/bills/create');
    dispatch({
        type: BILL_CREATE_SUCCESS,
        payload: data.bill
    })
 }catch(error){
    dispatch({
        type:BILL_CREATE_FAIL,
        payload: 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
 }
}

// update action 
export const updateBill= (bill) => async(dispatch, getState)=>{
    dispatch({type:BILL_UPDATE_REQUEST, payload: bill})
    try{
        const {data} = await Axios.put(`/api/bills/${bill._id}`, bill) 
        dispatch({type:BILL_UPDATE_SUCCESS, payload:data})
    }catch(error){
        dispatch({
            type: BILL_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}