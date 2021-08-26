import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, Route } from 'react-router-dom';
import ReactPaginate from 'react-paginate'

import LoadingBox from './LoadingBox.js';
import MessageBox from './MessageBox.js';
import { createBill, listBills } from '../actions/billsActions.js';
import { BILL_CREATE_RESET } from '../constants/billsConstants.js';
import SearchBox from './../components/SearchBox.js';

export default function Bill(props) {

  // const { bill } = props;
  const dispatch = useDispatch();
  const billList = useSelector(state => state.billList)
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin
  const {loading, error, bills} = billList
  const billCreate = useSelector(state => state.billCreate);
  const { loading: loadingCreate, error: errorCreate,success: successCreate, bill:createdBill} = billCreate;

  useEffect(()=>{
     if(successCreate){
       dispatch({type: BILL_CREATE_RESET})
       props.history.push(`/bill/${createdBill._id}/edit`)
     }
      dispatch(listBills({}))
  }, [createdBill,dispatch,props.history, successCreate])
  const createHandler = () => {
    dispatch(createBill())
  }

  const billListDate = (e) =>{
    e.preventDefault();
    props.history.push(`/search/date/`)

  }
    return (
        <div>
          {loading? <LoadingBox></LoadingBox>
          :
          error?<MessageBox variant="danger">{error}</MessageBox>
          :
          <div>
             <div className=' '>
        <button className='primary button-space'> <Link to={`/BillUpload`}>Bill Upload</Link></button>
       { userInfo && userInfo.isAdmin ?<button className='primary button-space'> <Link to={`/Register`}>Add User</Link></button>:null
       }
<button className='primary button-space' type="button" onClick={createHandler}>Create Bill</button>        
<button className='primary button-space' type="button" onClick={billListDate} >Bill Till Date</button>        
        

        </div>
        
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox>{errorCreate}</MessageBox>}
            <h2>Bill Master</h2> 
            <hr></hr>

            <div className="row-search" > 
             Search  &nbsp; <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>  
             </div>
            
              
           
             {/* <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route> */}

            <br></br>
            <table className="table ">
            <thead>
              <tr>
                <th>Bill</th>
                <th>Name </th>
                {/* 0<th>Mobile</th>
                <th>Total Amount</th>
                <th>Balance</th> */}
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                  {
                   bills.map((bill) =>(
                    <tr key={bill._id}>
                    <td>{bill.billID}</td>
                    <td>{bill.customerName}</td>
                    {/* <td>{bill.contact}</td>
                    <td>{bill.totalAmount}</td>
                    <td>{bill.receivedAmount}</td> */}
                    <td>{bill.pendingAmount}</td>
                    {/* <td>1000</td> */}
                    <td><button > <Link to={`/bill/${bill._id}`}>Explore</Link></button>
                    <button onClick={() => props.history.push(`/bill/${bill._id}/edit`)} > Edit</button>
                    </td>
                  </tr>    
                )

                  
                )
              }
  
    </tbody>
  </table>
    </div>
          }
     
        </div>
    )
}
