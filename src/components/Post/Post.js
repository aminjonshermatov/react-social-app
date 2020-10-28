import React from 'react'
import './Post.css'
import Tags from '../Tags/Tags';

function Post({post}) {
    const {author, photo, tags} = post;
    const likeImg = post.likedByMe ? 'https://lms.openjs.io/liked.svg' : 'https://lms.openjs.io/unliked.svg';
    
    return (
        <article>
            <header>
                <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                <h5>{author.name}</h5>
                <div>{post.created}</div>
                {post.hit && <span>HIT</span>}
            </header>
            <div>
                <div className="Post-content">{post.content}</div>
                {photo && <img src={photo.url} alt={photo.alt} className="Post-photo"/>}
            </div>
            <footer>
                <span className="Post-likes">
                    <img src={likeImg} alt="likes" width="20" height="20"/>
                    <span className="Post-likes-count">{post.likes}</span>
                    {tags && <Tags tags={tags} />}
                </span>
            </footer>
        </article>
    )
}

export default Post
