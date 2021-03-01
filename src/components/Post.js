import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import '../App.css';
import axios from "../axios.js";
const Post = props => {
    const [like, setlike] = useState(false);
    useEffect(() => {
        setlike(props.post.is_liked_by_current_user)

    }, []);
    const likepost = () =>{
        setlike(!like)
        axios.post('/posts/'+props.post.id+'/like-unlike')
        .then(response => {
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
    
            <div className="post mb-2 p-4 shadow">
            <h3>{props.post.user.username}</h3>
            <p>{props.post.body}</p>
            <small style={{color:'gray'}}>{props.post.updated_at}</small>
            <br />
            <Button variant={like === true? "primary" :"outline-secondary"}
            onClick={() => likepost()}>like</Button>
        </div>
        
    );
};

export default Post;