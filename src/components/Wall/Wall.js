import React, {useState} from 'react'
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

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
            hidden: true,
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
            hidden: false,
            likes: 10,
            likedByMe: true,
            tags: ['deadline'],
            created: 1603501200
        }
    ]);
    const [edited, setEdited] = useState();

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

    const handleTogglePostVisibility = id => {
        setPosts(prevState => prevState.map(item => {
            if (item.id !== id) {
                return item;
            }

            return {
                ...item,
                hidden: !item.hidden
            };
        }));
    };

    const handlePostRemove = id => {
        setPosts(prevState => prevState.filter(item => item.id !== id));
    }

    const handlePostEdit = id => {
        const post = posts.find(el => el.id === id);
        if (post === undefined) {
            return;
        }

        setEdited(post);
    };

    const handlePostSave = post => {
        if (edited !== undefined) {
            setPosts(prevState => prevState.map(el => {
                if (el.id !== post.id) {
                    return el;
                }

                return {...post};
            }));
            setEdited(undefined);
            return;
        }
        setPosts(prevState => [{...post}, ...prevState]);
    };

    const handlePostEditCancel = () => {
        setEdited(undefined);
    };

    return (
        <>
            <PostForm edited={edited} onCancel={handlePostEditCancel} onSave={handlePostSave}/>
            <div>
                {posts.map(item => <Post
                                    key={item.id}
                                    post={item}
                                    onLike={handlePostLike}
                                    onRemove={handlePostRemove}
                                    onHide={handleTogglePostVisibility}
                                    onEdit={handlePostEdit}
                                    onShow={handleTogglePostVisibility}
                />)}
            </div>
        </>
    )
}

export default Wall;