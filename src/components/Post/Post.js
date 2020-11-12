import React, { useContext } from 'react'
import './Post.css'
import Tags from '../Tags/Tags';
import PostsContext from '../../contexts/PostsContext';
import { edit, hide, like, remove, show } from "../../store/actions";

function Post({post}) {
    const { author, photo, tags } = post;

    const { dispatch } = useContext(PostsContext);

    const handleLike = () => {
        dispatch(like(post.id));
    };

    const handleRemove = () => {
        dispatch(remove(post.id));
    };

    const handleHide = () => {
        dispatch(hide(post.id));
    };

    const handleShow = () => {
        dispatch(show(post.id));
    };

    const handleEdit = () => {
        dispatch(edit(post.id));
    };

    if (post.hidden) {
        return (
            <article>
                <header>
                    <img
                        src={author.avatar}
                        className="Post-avatar"
                        width="50"
                        height="50"
                        alt={author.name}
                    />
                    <h5>{author.name}</h5>
                    <button onClick={handleShow}>показать</button>
                </header>
            </article>
        );
    }
    
    return (
        <article>
            <header>
                <img
                    src={author.avatar}
                    className="Post-avatar"
                    width="50"
                    height="50"
                    alt={author.name}
                />
                <h5>{author.name}</h5>
                <button onClick={handleRemove}>удалить</button>
                <button onClick={handleHide}>скрыть</button>
                <button onClick={handleEdit}>изменить</button>
                <div>{post.created}</div>
                {post.hit && <span>HIT</span>}
            </header>
            <div>
                <div className="Post-content">{post.content}</div>
                {photo && <img src={photo.url} alt={photo.alt} className="Post-photo"/>}
            </div>
            <footer>
                <span className="Post-likes" onClick={handleLike}>
                    <img
                        src={post.likedByMe ? 'https://lms.openjs.io/liked.svg' : 'https://lms.openjs.io/unliked.svg'}
                        alt="likes"
                        width="20"
                        height="20"
                    />
                    <span className="Post-likes-count">{post.likes}</span>
                    {tags && <Tags tags={tags} />}
                </span>
            </footer>
        </article>
    );
}

export default Post
