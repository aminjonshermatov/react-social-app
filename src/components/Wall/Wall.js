import React from 'react'
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { postsRequest } from '../../store/actions';

function Wall() {
    const { items, loading, error } = useSelector(state => state.posts, shallowEqual);
    const dispatch = useDispatch();

    const handleReload = () => {
        dispatch(postsRequest());
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
                {items.map(item => <Post key={item.id} post={item} />)}
            </div>
        </>
    )
}

export default Wall;