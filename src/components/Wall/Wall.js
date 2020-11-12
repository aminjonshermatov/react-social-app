import React, { useContext } from 'react'
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import PostsContext from "../../contexts/PostsContext";

function Wall() {
    const {state: {posts}} = useContext(PostsContext);

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