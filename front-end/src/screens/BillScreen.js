import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import data from './../test_data.js'
import { Link } from 'react-router-dom';
import LoadingBox from './../components/LoadingBox.js';
import MessageBox from './../components/MessageBox.js';
import { detailsBill } from '../actions/billsActions.js';


export default function BillScreen(props) {
    // const bill = data.bills.find((x)=> x._id === props.match.params.id);
    const dispatch = useDispatch();
    const billDetails = useSelector((state)=> state.billDetails);
    const {loading, error, bill} = billDetails
    const billId = props.match.params.id;
    useEffect(()=>{
        dispatch(detailsBill(billId))
    }, [dispatch, billId])
   
    return (
        <div>
        {loading? <LoadingBox></LoadingBox>
        :
        error?<MessageBox variant="danger">{error}</MessageBox>
        :
        <div>
        <div className='row '>
        <button className='primary button-right'> <Link to={`/Bills`}>Bill Master</Link></button>
        </div>
        {/* <Link to="/Bills">Bills Master</Link> */}
      <div className='row center'>
          <div className='cutomername'>
            {bill.customerName}
          </div>
          {/* <div className="col-2" style={{justifyContent:"right"}}>
             Customer Name : {bill.contact}
          </div> */}

         
      </div>
      <div className='row margin'>
      <div className="col-3 ">
             <h3>
                Bill Number : {bill.billID}
             </h3>
          </div>
          <div className="col-3 ">
             <h3>
                 Address Details : {bill.address}
             </h3>
          </div>

          <div className="col-3 ">
              <h3> Contact details : {bill.contact} </h3>
          </div>

      </div>
        <hr className="new2"></hr>
      <div className='row'  >
          <div className='.col-1-balance card balance '>
             <span className=""></span>
              Balance : {bill.totalAmount - bill.receivedAmount}
          </div>
        
      </div>
   <hr className="new2"></hr>
   <div>
      
   </div>

   <div className='col-2'>
       <h3><span>ITEM DETAILS</span></h3>
       {bill.itemDesc}
    </div>



    <br></br>
    <h3>AMOUNT DETAILS</h3>
    <div className='col-2'>
       <table className="table-desc">
       <tr>
               <th>
                   Total Amount
               </th>
               <td>
                  Rs. {bill.totalAmount} 
               </td>
           </tr>
           <tr>
               <th>
                   Received Amount
               </th>
               <td>
                   Rs. {bill.receivedAmount}
               </td>
           </tr>
           <tr>
               <th>
                   Balance Amount
               </th>
               <td>
                   <span style={{color:'red'}}>
               Rs. {bill.totalAmount - bill.receivedAmount}</span>
               </td>
           </tr>
        
       </table>
   </div>
   
    </div>
    
        }
   

      </div>
        

     
    )
}
