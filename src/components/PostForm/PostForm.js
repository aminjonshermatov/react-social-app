import React, { useRef } from 'react';
import { editSubmit, editChange, editCancel } from '../../store/actions'
import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function PostForm() {
    const dispatch = useDispatch();
    const edited = useSelector(state => state.edited, shallowEqual);
    const firstFocusEl = useRef(null);

    const handleSubmit = ev => {
        ev.preventDefault();
        dispatch(editSubmit());
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
                value={edited.content || ''}
                onChange={handleChange}
            />
            <input
                name='tags'
                placeholder='tags'
                value={edited.tags?.join(' ') || ''}
                onChange={handleChange}
            />
            <input
                name='photo'
                placeholder='photo'
                value={edited.photo?.url || ''}
                onChange={handleChange}
            />
            <input
                name='alt'
                placeholder='alt'
                value={edited.photo?.alt || ''}
                onChange={handleChange}
            />
            <button type="submit">Ok</button>
            {edited.id ? <button type="button" onClick={handleReset}>Отменить</button> : ''}
        </form>
    );
}