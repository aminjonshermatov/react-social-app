import {
    POST_LIKE,
    POST_REMOVE,
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL
} from "../actions";

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

export const initialState = {
    posts: [],
    loading: false,
    error: null
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
            return reducePostsRequest(state, action);
        case POSTS_SUCCESS:
            return reducePostsSuccess(state, action);
        case POSTS_FAIL:
            return reducePostsFail(state, action);
        case POST_LIKE:
            return reducePostLike(state, action);
        case POST_REMOVE:
            return reducePostRemove(state, action);
    }
};

const reducePostsRequest = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const reducePostsSuccess = (state, action) => {
    return {
        ...state,
        posts: action.payload.items.map(item => ({...empty, ...item})),
        loading: false,
        error: null
    };
};

const reducePostsFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.payload.error
    };
};

const reducePostLike = (state, action) => {
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
                likes: item.likedByMe ? item.likes - 1 : item.likes + 1,
                likedByMe: !item.likedByMe
            };
        })
    };
};

const reducePostRemove = (state, action) => {
    const { posts } = state;
    const { payload: { id } } = action;

    return {
        ...state,
        posts: posts.filter(item => item.id !== id)
    };
};