import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import data from './../test_data.js'
import { Link } from 'react-router-dom';
import LoadingBox from './../components/LoadingBox.js';
import MessageBox from './../components/MessageBox.js';
import Axios from 'axios';
import axios from 'axios';

export default function BillUpload(props) {
   const [loadingUpload, setLoadingUpload] = useState(false)
   const [errorUpload, setErrorUpload]=useState('')
    const uploadFileHandler = async (e) => {
        console.log(e.target.files[0])
        e.preventDefault();
        const file = e.target.files[0];
        
        const bodyFormData = new FormData()
        bodyFormData.append('file',file)
        console.log(bodyFormData)
        alert('Uploaded')
        setLoadingUpload(true);
        try{
            const {data} = await Axios.post('http://localhost:4000/api/bills/upload', bodyFormData, {
               
            }).then(res=>{ alert('uploaded')})
            setLoadingUpload(false)
          alert(data)
        } catch (error) {
            setErrorUpload(error.message)
            setLoadingUpload(false)
          alert(error)
        }
    }
   
    return(
        <div>
        <div className='row '>
        <button className='primary button-right'> <Link to={`/Bills`}>Bill Master</Link></button>
        </div>
        <div>
            <div className='row'>
            <form className="form" >
                <div>
                    <h1>
                     Upload Bills
                    </h1>
                </div>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && <MessageBox>Data Imported </MessageBox>}
                <div>
                    <label htmlFor="File">File to Upload</label>
                    <input type="file" id='file' placeholder="Enter Name" onChange={uploadFileHandler}></input>

                </div>
                
                <div>
                    <label />
                    <button className="primary" type="button" onClick={uploadFileHandler}>Upload</button>
                </div>
            </form>

            
            </div>
         
        </div>
        </div>
        
       
    )
}