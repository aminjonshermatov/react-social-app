import React, { useState, useRef, useEffect } from 'react';

const empty = {
    id: 0,
    author: {
        avatar: 'https://lms.openjs.io/logo_js.svg',
        name: 'OpenJS'
    },
    content: '',
    photo: null,
    hit: false,
    likes: 0,
    likedByMe: false,
    hidden: false,
    tags: null,
    created: 0
};

export default function PostForm({edited = empty, onSave, onCancel}) {
    const [post, setPost] = useState(edited);
    const firstFocusEl = useRef(null);
    useEffect(() => {
        setPost(edited);
    }, [edited]);

    const handleSubmit = ev => {
        ev.preventDefault();
        const parsed = post.tags?.map(tag => tag.replace(/#/m, '')).filter(tag => tag.trim() !== '') || [];
        const tags = parsed.length !== 0 ? parsed : null;
        onSave({
            ...post,
            id: post.id || Date.now(),
            created: post.created || Date.now(),
            tags,
            photo: post.photo?.url ? {alt: '', ...post.photo} : null
        });
        setPost(empty);
        firstFocusEl.current.focus();
    };

    const handleChange = ev => {
        const {name, value} = ev.target;
        if (name === 'tags') {
            const parsed = value.split(' ');
            setPost(prevState => ({...prevState, [name]: parsed}));
            return;
        } else if (name === 'photo' || name === 'alt') {
            const photo = {...post.photo, [name === 'photo' ? 'url' : name]: value};
            setPost(prevState => ({...prevState, photo}));
            return;
        }
        setPost(prevState => ({...prevState, [name]: value}));
    };

    const handleClick = () => {
        setPost(empty);
        onCancel();
        firstFocusEl.current.focus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                ref={firstFocusEl}
                name='content'
                value={post.content || ''}
                onChange={handleChange}
            />
            <input
                name='tags'
                placeholder='tags'
                value={post.tags?.join(' ') || ''}
                onChange={handleChange}
            />
            <input
                name='photo'
                placeholder='photo'
                value={post.photo?.url || ''}
                onChange={handleChange}
            />
            <input
                name='alt'
                placeholder='alt'
                value={post.photo?.alt || ''}
                onChange={handleChange}
            />
            <button type="submit">Ok</button>
            {post.id ? <button type="button" onClick={handleClick}>Отменить</button> : ''}
        </form>
    );
}