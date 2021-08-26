import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listBills, listDateBills } from '../actions/billsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function DateScreen(props){


    const {customerName='all'}= useParams();
    
    const dispatch = useDispatch();
    // alert(customerName)
    // alert(customerName)
    const billDateList = useSelector((state) => state.billDateList);
    const {loading, error, bills} = billDateList;
    useEffect(()=>{
        dispatch(listDateBills());
    },[dispatch])

    return(
        <div className=''>
            {loading ?(
                <LoadingBox></LoadingBox>
            ):error ? (
                <MessageBox variant='danger'>{error}</MessageBox>
            ):(
                <div className="">
                    <div className='row '>
        <button className='primary button-right'> <Link to={`/Bills`}>Bill Master</Link></button>
        </div>
        <br></br>
                    <div className='row '>
                        
                    {bills.length} Result
                    </div>
                    <br></br>
                <div className='row '>
                    <table className="table">
            <thead>
              <tr>
                <th>Bill</th>
                <th>Name</th>
                {/* <th>Mobile</th>
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
                </div>
            )}


        </div>
    )
}