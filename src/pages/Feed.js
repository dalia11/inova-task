import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "../axios.js";
import Post from "../components/Post";
const Feed = props => {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        let data = localStorage.getItem('token');
        if (data) {
            axios.defaults.headers.common.Authorization = `Bearer ${data}`
            axios.get('/home/posts')
                .then(response => {
                    console.log(response.data.data.posts)
                    setposts(response.data.data.posts)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            props.history.replace("/login");
        }
    }, []);
    return (
        <>
        <div className="m-4">
            {posts != undefined? posts.map((el,ind) => <Post key={ind} post={el}/>):null}
        </div>
        <Link to="/login">Logout</Link>
        </>
    );
};

export default Feed;