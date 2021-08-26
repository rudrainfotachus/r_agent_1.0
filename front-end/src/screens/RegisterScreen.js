import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
 
export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const redirect = '/Bills'

    const userRegister = useSelector((state) => state.userRegister)
    const {userInfo, loading, error} = userRegister

    const dispatch = useDispatch()
    const submitHandler =  (e) =>{
        e.preventDefault();
        // to do : sign action
        dispatch(register(name,email, password))
    }
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    },[userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                       Add New User
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' placeholder="Enter Name" required onChange={e => setName(e.target.value)}></input>

                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' placeholder="Enter email" required onChange={e => setEmail(e.target.value)}></input>

                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder="Enter password" required onChange={e => setPassword(e.target.value)}></input>

                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Create User</button>
                </div>
            </form>
        </div>
    )
}
