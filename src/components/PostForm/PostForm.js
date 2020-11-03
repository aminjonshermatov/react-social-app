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
        let photo = null;
        const [,,url,alt] = ev.target.childNodes;
        if (url.value !== '') {
            photo = {
                url: url.value,
                alt: alt.value
            };
        }
        let tags = post.tags?.filter(tag => tag !== '').map(tag => tag.replace(/^#/im, ''));
        if (tags[0] === undefined) tags = null;
        onSave({...post, tags, photo});
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
            <input name='tags' placeholder='tags' value={post.tags?.join(' ')} onChange={handleChange} />
            <input name='photo' placeholder='photo'  />
            <input name='alt' placeholder='alt' />
            <button>Ok</button>
        </form>
    );
}