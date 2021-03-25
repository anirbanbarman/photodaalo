import React from 'react';
import { useState ,useContext} from "react";
import {UserContext} from '../../App.js'
import M from 'materialize-css';
import { Link,useHistory} from "react-router-dom";

const Login = () => {
  const {state,dispatch}=useContext(UserContext)

const history=useHistory();

const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const postData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#ff1744 red accent-3"})
        return

    }
    fetch('signin', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
.then(response => response.json())
.then(data => { 
  console.log('Success:', data);
  if(data.error){
    M.toast({html: data.error,classes:"#ff1744 red accent-3"})

  }
  else{
      localStorage.setItem("jwt",data.token);
      localStorage.setItem("user",JSON.stringify(data.user) );
      dispatch({type:"USER",payload:data.user})

      M.toast({html:"login successful",classes:"#4caf50 green"})
      history.push('/')
  }
})
.catch((error) => {
  console.error('Error:', error);
});
    
    }
    return (<>
        <div className="mycard">

            <div className="card auth-gard input-field">
                <h2>Photo Daalo</h2>
                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
               
                <button onClick={()=>postData()} className="btn waves-effect waves-light  #64b5f6 blue darken-1" >Login
          </button>
                <h5>
                    <Link to="/signup">
Dont have an account?
                    </Link>
                </h5>


            </div></div></>);
}

export default Login;