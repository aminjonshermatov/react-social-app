import React, { useRef } from 'react';
import { editSubmit, editChange, editCancel, postSaveRequest, postSaveSuccess, postSaveFail } from '../../store/actions'
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function PostForm() {
    const dispatch = useDispatch();
    const { item, loading, error } = useSelector(state => state.edited, shallowEqual);
    dispatch(postSaveRequest());

    const firstFocusEl = useRef(null);

    const handleSubmit = ev => {
        ev.preventDefault();
        
        fetch(`https://aminjonshermatov-nodeapp.herokuapp.com/posts.post?content=post${Math.random() * 50}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('bad http status');
                }

                return response.json();
            })
            .then(body => {
                dispatch(postSaveSuccess(body));
                // get posts
            })
            .catch(error => {
                dispatch(postSaveFail(error));
            });

        firstFocusEl.current.focus();
    };

    const handleChange = ev => {
        const {name, value} = ev.target;
        dispatch(editChange(name, value));
    };

    const handleReset = () => {
        dispatch(editCancel());
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                ref={firstFocusEl}
                name='content'
                value={item.content || ''}
                onChange={handleChange}
            />
            <input
                name='tags'
                placeholder='tags'
                value={item.tags?.join(' ') || ''}
                onChange={handleChange}
            />
            <input
                name='photo'
                placeholder='photo'
                value={item.photo?.url || ''}
                onChange={handleChange}
            />
            <input
                name='alt'
                placeholder='alt'
                value={item.photo?.alt || ''}
                onChange={handleChange}
            />
            <button type="submit">Ok</button>
            {item.id ? <button type="button" onClick={handleReset}>Отменить</button> : ''}
        </form>
    );
}