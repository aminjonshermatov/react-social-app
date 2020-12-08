import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { editChange, editCancel, postSaveRequest, postSaveSuccess, postSaveFail, savePost } from '../../store/actions'
// editSubmit
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function PostForm() {
    const dispatch = useDispatch();
    // loading error
    const { item } = useSelector(state => state.edited, shallowEqual);
    dispatch(postSaveRequest());

    const firstFocusEl = useRef(null);

    const handleSubmit = ev => {
        ev.preventDefault();// https://express-mysql-social.herokuapp.com/api/posts.
        dispatch(savePost());
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