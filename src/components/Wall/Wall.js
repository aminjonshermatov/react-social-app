import React, { useEffect } from 'react'
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { loadPosts } from '../../store/actions'

function Wall() {
    const { posts, loading, error } = useSelector(state => state.posts, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        // loadPosts(dispatch);
        dispatch(loadPosts());
    }, [dispatch]);

    const handleReload = () => {
        // loadPosts(dispatch);
        dispatch(loadPosts());
    };

    if (loading) {
        return (
            <>
                Идёт загрузка данных....
            </>
        );
    }

    if (error) {
        return (
            <>
                Произошла ошибка. <button onClick={handleReload}>Повторить запрос?</button>
            </>
        );
    }

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