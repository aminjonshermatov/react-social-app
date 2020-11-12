import React, { useReducer, useMemo } from 'react';
import PostsContext from './PostsContext';
import { reducer, initialState } from '../store/reducers';

export default function PostsProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

/*     const like = id => {
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
    
    const remove = id => {
        setPosts(prevState => prevState.filter(item => item.id !== id));
    }

    const toggleVisibility = id => {
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

    const edit = id => {
        const post = posts.find(el => el.id === id);
        if (post === undefined) {
            return;
        }

        setEdited(post);
    };

    const save = post => {
        if (edited?.id === 0) {
            setPosts(prevState => [{...post}, ...prevState]);
            setEdited(undefined);
            return;
        }
        
        setPosts(prevState => prevState.map(el => {
            if (el.id !== post.id) {
                return el;
            }

            return {...post};
        }));

        setEdited(empty);
        return;
    };

    const cancel = () => {
        setEdited(empty);
    }; */

    return (
        <PostsContext.Provider value={value}>
            {props.children}
        </PostsContext.Provider>
    );
}