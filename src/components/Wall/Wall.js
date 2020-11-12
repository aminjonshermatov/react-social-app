import React from 'react'
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { shallowEqual, useSelector } from "react-redux";

function Wall() {
    const posts = useSelector(state => state.posts, shallowEqual);

    return (
        <>
            <PostForm />
            <div>
                {posts.map(item => <Post key={item.id} post={item} />)}
            </div>
        </>
    )
}

export default Wall;