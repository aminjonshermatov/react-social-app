import React, { useState } from 'react';

export default function PostForm({onSave}) {
    const [post, setPost] = useState({
        id: Date.now(),
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
        tags: [],
        created: Date.now()
    });

    const handleSubmit = ev => {
        ev.preventDefault();
        let tags = post.tags?.filter(tag => tag !== '').map(tag => tag.replace(/^#/im, ''));
        if (tags[0] === undefined) tags = null;
        onSave({...post, tags});
    };

    const handleChange = ev => {
        const {name, value} = ev.target;
        if (name === 'tags') {
            const parsed = value.split(' ');
            setPost(prevState => ({...prevState, [name]: parsed}));
            return;
        }

        setPost(prevState => ({...prevState, [name]: value}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea name='content' value={post.content} onChange={handleChange}></textarea>
            <input name='tags' value={post.tags?.join(' ')} onChange={handleChange}/>
            <button>Ok</button>
        </form>
    );
}