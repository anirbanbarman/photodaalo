import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../App.js'
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
const history=useHistory();

  const renderList = () => {
    if (state) {
      return [
        <li key="1"><Link to="/profile">Profile</Link></li>,
        <li  key="2"><Link to="/makingPost">Create Post</Link></li>,
        <li  key="3">
           <button onClick={()=>{
             localStorage.clear()
             dispatch({ type: "CLEAR"})
             history.push('/signin')
           }} className="btn waves-effect waves-light #f44336 red darken-1" >Logout
          </button>
        </li>

      ]

    } else {
      return [
        <li  key="3"><Link to="/signin">Signin</Link></li>,
        <li  key="4"><Link to="/signup">Signup</Link></li>
      ]

    }
  }

  return (<nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"signin"} className="brand-logo">Photo Daalo</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}


      </ul>
    </div>
  </nav>);
}

export default NavBar;