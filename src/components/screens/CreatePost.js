import React from 'react';
import { useState } from "react";
import M from 'materialize-css';
import {
  Link,useHistory
} from "react-router-dom";
const CreatePost = () => {
const history=useHistory();

  
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("");

const postDetails=()=>{
  const data= new FormData();
  data.append("file",image);
  data.append("upload_preset","photo daalo");
  data.append("cloud_name","anirbancloud");
  fetch("	https://api.cloudinary.com/v1_1/anirbancloud/image/upload",{
    method:"POST",
    body:data
  }).then(res=>res.json()).then(data=>{
    console.log(data);
    setUrl(data.url);

    fetch('createpost', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({ title, body,pic:data.url }),
    })
    .then(response => response.json())
    .then(data => { 
      console.log('Success:', data);
      if(data.error){
        M.toast({html: data.error,classes:"#ff1744 red accent-3"})
    
      }
      else{
          M.toast({html:"created post successfully",classes:"#4caf50 green"})
          history.push('/')
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  })
  .catch(err=>{
    console.log(err)
  })

  
  
}

    return ( 
        <div className="card input-field"
        style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}
        >
          <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="body" value={body} onChange={e => setBody(e.target.value)} />
       
            <div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button onClick={()=>postDetails()}  className="btn waves-effect waves-light #64b5f6 blue darken-1" >Submit Post
          </button>
    </div>


     
     );
}
 
export default CreatePost;