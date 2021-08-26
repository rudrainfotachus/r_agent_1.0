import React, { useState } from 'react'

export default function SearchBox(props) {
  const [customerName, setCustomerName]=useState('')
  const submitHandler = (e) =>{
      e.preventDefault();
      props.history.push(`/search/customerName/${customerName}`)
  }
    return(
        <div>
        <form className='search' onSubmit ={submitHandler}>
            
                
                <input type='text' name='q' id='q'placeholder="Search by Customer Name" onChange={(e) =>setCustomerName(e.target.value)}></input>
                

            

        </form>
    </div>
    )
    

}