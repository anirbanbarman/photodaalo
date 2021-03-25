import { useState } from "react";
import {
    Link,useHistory
} from "react-router-dom";
import M from 'materialize-css';




const SignUp = () => {
    const history=useHistory();
    
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const postData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#ff1744 red accent-3"})
        return

    }
    fetch('signup', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, email, password }),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  if(data.error){
    M.toast({html: data.error,classes:"#ff1744 red accent-3"})

  }
  else{
      M.toast({html:data.message,classes:"#4caf50 green"})
      history.push('/signin')
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
                <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />

                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light  #64b5f6 blue darken-1" onClick={()=>postData()} >Signup
              </button>
                <h5>
                    <Link to="/signin">
                        Already have an account?
              </Link>
                </h5>


            </div></div></>);
}

export default SignUp;