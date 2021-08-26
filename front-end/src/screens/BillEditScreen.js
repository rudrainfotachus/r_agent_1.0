import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsBill, updateBill } from '../actions/billsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BILL_UPDATE_RESET } from '../constants/billsConstants';

export default function BillEditScreen(props){
    const billId = props.match.params.id;
    const [customerName,setCustomerName] = useState('')
    const [contact,setContact] = useState('')
    const [date,setDate] = useState('')
    const [type,setType] = useState('')
    const [billID,setBillID] = useState('')
    const [totalAmount,setTotalAmount] = useState('')
    const [due,setDue] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [pendingAmount,setPendingAmount] = useState('')
    const [address,setAddress] = useState('')
    const [description,setDescription] = useState('')
    const [itemDesc,setItemDesc] = useState('')
    const billDetails = useSelector(state => state.billDetails)
    const {loading, error, bill} = billDetails

    const billUpdate = useSelector(state => state.billUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = billUpdate
    const dispatch = useDispatch();
    useEffect(()=>{
        if(successUpdate){
            alert('Updated Successfully')
            dispatch({type:BILL_UPDATE_RESET})
            props.history.push('/')
        
        }
        if(!bill || (bill._id !== billId))    {
            dispatch(detailsBill(billId));
        }
        else{
            setCustomerName(bill.customerName)
            setContact(bill.contact)
            setDate(bill.date)
            setType(bill.type)
            setBillID(bill.billID)
            setTotalAmount(bill.totalAmount)
            setDue(bill.due)
            setDueDate(bill.dueDate)
            setPendingAmount(bill.pendingAmount)
            setItemDesc(bill.itemDesc)
            setAddress(bill.address)
            setDescription(bill.description)

        }
        
            
    },[bill,dispatch,billID,successUpdate, props.history])

    const submitHandler = (e) =>{
        alert(dueDate)
        e.preventDefault();
        dispatch(updateBill({_id:billId,customerName,contact,date,type,itemDesc,address,description,billID,totalAmount,pendingAmount,due,dueDate}))
    }
    return(
        <div>
              <div className='row '>
        <button className='primary button-right'> <Link to={`/Bills`}>Bill Master</Link></button>
        </div>
            <form className="form" onSubmit={submitHandler}>
            <h1><div>Edit Bill {billID}</div></h1>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading ? <LoadingBox></LoadingBox>
            : error? <MessageBox variant='danger'>{error}</MessageBox>
            :
            <>
            <div>
                <label htmlFor='cusName'>Customer Name</label>
                <input id="cusName" type="text" placeholder="Enter Customer Name" value={customerName} onChange={(e)=> setCustomerName(e.target.value)}></input>
                <label htmlFor='ccontact'>Contact</label>
                <input id="contact" type="text" placeholder="Enter Contact Number" value={contact} onChange={(e)=> setContact(e.target.value)}></input>
                <label htmlFor='date'>Date - {date}</label>
                <input id="date" type="text" placeholder="Enter Date" value={date}  disabled></input>
                <label htmlFor='type'>Type</label>
                <input id="type" type="text" placeholder="Enter type" value={type} onChange={(e)=> setType(e.target.value)}></input>


                <label htmlFor='itemDesc'>Item Description</label>
                <input id="itemDesc" type="text" placeholder="Items Details" value={itemDesc} onChange={(e)=> setItemDesc(e.target.value)}></input>

                <label htmlFor='address'>Address</label>
                <input id="address" type="text" placeholder="Enter Address" value={address} onChange={(e)=> setAddress(e.target.value)}></input>
                  
                <label htmlFor='description'>Description</label>
                <input id="description" type="text" placeholder="Enter Descriptopn" value={description} onChange={(e)=> setDescription(e.target.value)}></input>

                <label htmlFor='billID'>Bill ID</label>
                <input id="billID" type="text" placeholder="Enter Bill ID" value={billID} onChange={(e)=> setBillID(e.target.value)}></input>

                <label htmlFor='totalAmount'>Total Amount</label>
                <input id="totalAmount" type="text" placeholder="Enter Total Amount" value={totalAmount} onChange={(e)=> setTotalAmount(e.target.value)}></input>

                <label htmlFor='pendingAmount'>Pending Amount</label>
                <input id="pendingAmount" type="text" placeholder="Enter Total Amount" value={pendingAmount} onChange={(e)=> setPendingAmount(e.target.value)}></input>

                <label htmlFor='due'>Due</label>
                <input id="due" type="text" placeholder="Enter Y or N" value={due} onChange={(e)=> setDue(e.target.value)}></input>

                <label htmlFor='duedate'>Due Date - {dueDate}</label>
                <input id="duedate" type="date" placeholder="Enter Customer Name" value={dueDate} onChange={(e)=> setDueDate((e.target.value).split("-").reverse().join("-"))}></input>
            </div>
            <div>
                <label></label>
                <button className="primary" type="submit">Update</button>
            </div>
            </>
            }
            </form>
        </div>
    )
}