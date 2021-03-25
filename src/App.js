import NavBar from "./components/Navbar";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useHistory
} from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })
debugger
     // history.push('/')
    }
    else {
      history.push('/signin')


    }
  }, []);

  return <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    
    <Route path="/signin">
      <Login />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/makingPost">
      <CreatePost />
    </Route>
    <Route path="/profile/:userId">
      <UserProfile />
    </Route>
  </Switch>


}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <NavBar />
          <Routing />


        </div>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
