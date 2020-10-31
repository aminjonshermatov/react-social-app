import React, {useState} from 'react'
import Post from '../Post/Post';

function Wall() {
    const [posts, setPosts] = useState([
        {
            id: 2,
            author: {
                id: 1,
                avatar: 'https://lms.openjs.io/logo_js.svg',
                name: 'OpenJS'
            },
            content: 'Ну как, вы справились с домашкой?',
            photo: null,
            hit: true,
            likes: 222,
            likedByMe: true,
            tags: ['deadline', 'homework'],
            created: 1603774800
        },
        {
            id: 1,
            author: {
                id: 1,
                avatar: 'https://lms.openjs.io/logo_js.svg',
                name: 'OpenJS'
            },
            content: null,
            photo: {
                url: 'https://lms.openjs.io/openjs.jpg',
                alt: 'openjs logo'
            },
            hit: true,
            likes: 10,
            likedByMe: true,
            tags: ['deadline'],
            created: 1603501200
        }
    ]);

    const handlePostLike = id => {
        setPosts(prevState => prevState.map(item => {
            if (item.id !== id) {
                return item;
            }

            const likedByMe = !item.likedByMe;
            const likes = likedByMe ? item.likes + 1 : item.likes - 1;

            return {
                ...item,
                likedByMe,
                likes
            };
        }));
    };

    const handlePostRemove = id => {
        setPosts(prevState => prevState.filter(item => item.id !== id));
    }

    return (
        <div>
            {posts.map(item => <Post key={item.id} post={item} onLike={handlePostLike} onRemove={handlePostRemove} />)}
        </div>
    )
}

export default Wall;