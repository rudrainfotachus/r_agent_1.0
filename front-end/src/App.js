// Developer : Rudra Infotachus
import React, { useEffect } from 'react'
import { BrowserRouter, Link, Redirect, Route, useHistory } from 'react-router-dom';
import data from './test_data.js';
import SigninScreen from './screens/SigninScreen';
import Bill from './components/Bill.js'
import BillScreen from './screens/BillScreen.js';
import BillUpload  from './screens/BillUpload.js';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions.js';
import RegisterScreen from './screens/RegisterScreen.js';
import BillEditScreen from './screens/BillEditScreen.js';
import SearchBox from './components/SearchBox.js';
import SearchScreen from './screens/SearchScreen.js';
import DateScreen from './screens/DateScreen.js';

// import SignIn from './screen/SigninScreen'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin

  const dispatch = useDispatch();
  //    useEffect(()=>{
  //     if(!(userInfo)){
  //         props.history.push('/')
  //     }
  // },[userInfo, props.history])    
  const signoutHandler = () =>{
    
    dispatch(signout())
  
  //   useEffect(()=>{
  //     if(!(userInfo)){
  //         props.history.push(redirect)
  //     }
  // },[userInfo])    
  }
  return (
    <BrowserRouter>
    
    <div class="grid-container">
    <header class="row">
      <div>
        <a class="brand" href="/">Recovery-Agent</a>
      </div>
      <div>
        {/* {
          userInfo ?(
<Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>
          )
          :
          (
     <div></div>
          )
        } */}
      </div>
    
      <div>
        {
        userInfo ? (
        <div className="dropdown">
        <Link to='#'>
          {userInfo.name}<i className="fa fa-caret-down"></i>{' '}
         </Link>
         <ul className="dropdown-content">
          <Link tp="#singout"  onClick={signoutHandler}>Sign Out</Link>
         </ul>
         </div>
        )
        :
        (<Link to="/">Sign-In</Link>)
        
        }
      </div>
    </header>
    <main>
          <Route path="/bill/:id" component = {BillScreen} exact></Route>
          <Route path="/bill/:id/edit" component = {BillEditScreen} exact></Route>
          <Route path="/" component={SigninScreen}  exact></Route>
          <Route path="/Bills" component={Bill}  ></Route>
          <Route path="/BillUpload" component={BillUpload}  ></Route>
          <Route path="/signin" component={SigninScreen}  ></Route>
          <Route path="/Register" component={RegisterScreen}  ></Route>
          <Route path='/search/customerName/:customerName?' component={SearchScreen} exact></Route>
          <Route path='/search/date' component={DateScreen} exact></Route>
 
    </main>
    <footer class="row center">All right reserved</footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
