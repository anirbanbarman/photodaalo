import { useState, useContext, useEffect } from "react";
import M from 'materialize-css';

import { UserContext } from '../../App.js'



const Profile = () => {
    const [mypic, setMypic] = useState([]);
  const { state, dispatch } = useContext(UserContext)
    


    useEffect(() => {

        fetch('/mypost', {
             headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.error) {
                    M.toast({ html: data.error, classes: "#ff1744 red accent-3" })

                }
                else {
                    console.log(data)
                    setMypic(data.mypost)

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [])

    return (<div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid gray" }}>
            <div>
                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                    src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />
            </div>
            <div>
                <h4>{state?state.name:"Loading"}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                    <h6>40 posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
            </div>
        </div>

        <div className="gallery">
           {mypic.map(post=>{
           return <img src
                className="item"
                src={post.photo}
                key={post._id}
            />
           })}
            
            
        </div>
    </div>);
}

export default Profile;