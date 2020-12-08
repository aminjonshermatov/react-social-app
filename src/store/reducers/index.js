import { combineReducers } from 'redux';
import { postsReducer } from "./posts";
import { editedReducer } from "./edited";

const appReducer = combineReducers({
    edited: editedReducer,
    posts: postsReducer
})

/*
POST_EDIT_SUBMIT,
POST_HIDE,
POST_SHOW
*/


/* const reduceSubmit = (state) => {
    const { edited, posts } = state;
    const parsed = edited.tags?.map(tag => tag.replace(/#/m, '')).filter(tag => tag.trim() !== '') || [];
    const tags = parsed.length !== 0 ? parsed : null;
    const post = {
        ...edited,
        id: edited.id || Date.now(),
        created: edited.created || Date.now(),
        tags,
        photo: edited.photo?.url ? {alt: '', ...edited.photo} : null
    };
    
    if (edited?.id === 0) {
        return {
            ...state,
            posts: [{...post}, ...posts],
            edited: empty
        };
    }

    return {
        ...state,
        posts: posts.map(item => {
            if (item.id !== post.id) {
                return item;
            }

            return {...post};
        }),
        edited: empty
    };
}; */

/* const reducePostToggleVisibility = (state, action) => {
    const { posts } = state;
    const { payload: { id } } = action;

    return {
        ...state,
        posts: posts.map(item => {
            if (item.id !== id) {
                return item;
            }

            return {
                ...item,
                hidden: !item.hidden
            };
        })
    };
}; */


export const rootReducer = (state, action) => {
    switch (action.type) {
        /* case POST_EDIT_SUBMIT:
            return reduceSubmit(state, action);
        case POST_HIDE:
            return reducePostToggleVisibility(state, action);
        case POST_SHOW:
            return reducePostToggleVisibility(state, action); */
        default:
            return appReducer(state, action);
    }
};