import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../App.js'
import M from 'materialize-css';
import { Link } from "react-router-dom";



const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {

        fetch('/allpost', {

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
                    setData(data)

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, []);
    const likePost = (id) => {
        fetch("/like", {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({ postId: id }),
        }).then(response => response.json())
            .then(
                result => {
                    console.log(data);
                    const newData = data.map(item => {
                        if (item._id == result._id) {
                            return result;
                        }
                        else {
                            return item;
                        }
                    })
                    setData(newData)
                }
            )
    }
    const unlikePost = (id) => {
        fetch("/unlike", {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({ postId: id }),
        }).then(response => response.json())
            .then(result => {
                console.log(data);
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result;
                    }
                    else {
                        return item;
                    }
                })
                setData(newData)
            })
    }

    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({ postId, text }),
        }).then(response => response.json())
            .then(
                result => {
                    console.log(data);
                    const newData = data.map(item => {
                        if (item._id == result._id) {
                            return result;
                        }
                        else {
                            return item;
                        }
                    })
                    setData(newData)


                }
            ).catch(e => console.log(e))
    }

    const deletePost = (postId) => {
        fetch(`/commentPost/${postId}`, {
            method: 'delete',
            headers: {
          'Authorization': "Bearer " + localStorage.getItem("jwt")

            },

        }).then(response => response.json())
            .then(
                result => {
                    console.log(data);
                    const newData = data.filter(item => {
                        return item._id !== result._id
                    })
                    setData(newData)

                }
            )
      
    }


    return (<div className="home">

        {data.map(item => {
            return (
                <div key={item._id} className="card home-card">
                    <h5><Link to={item.postedBy._id == state._id?"/profile"+item.postedBy._id:'/profile/'}>{item.postedBy.name}</Link>{item.postedBy._id == state._id
                        && <i onClick={() => deletePost(item._id)} style={{ float: "right" }} className="material-icons"
                        >delete</i>
                    }</h5>
                    <div className="card-image">
                        <img src={item.photo} />
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>favorite</i>
                            {item.likes.includes(state._id)
                                ?
                                <i className="material-icons"
                                    onClick={() => unlikePost(item._id)}>thumb_down</i> :
                                <i className="material-icons"
                                    onClick={() => likePost(item._id)} >thumb_up</i>}


                            <h6>{item.likes.length} likes</h6>


                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record => {
                                    return (
                                        <h6 key={record._id}><span>{record.postedBy.name}: </span>{record.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                console.log(e.target[0].value);
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="add a comment" />
                            </form>

                        </div>
                    </div>
                </div>
            )
        })}


    </div>);
}

export default Home;