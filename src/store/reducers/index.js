import {
    POST_EDIT,
    POST_EDIT_CANCEL,
    POST_EDIT_CHANGE,
    POST_EDIT_SUBMIT,
    POST_LIKE,
    POST_REMOVE,
    POST_HIDE,
    POST_SHOW,
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,
    POST_SAVE_REQUEST,
    POST_SAVE_SUCCESS,
    POST_SAVE_FAIL
} from '../actions';

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
    posts: {
        items: [],
        loading: false,
        error: null
    },
    edited: {
        item: empty,
        loading: false,
        error: null
    }
};

const reduceSubmit = (state) => {
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
};

const reduceChange = (state, action) => {
    const { item } = state.edited;
    const { payload: { name, value } } = action;
    if (name === 'tags') {
        const parsed = value.split(' ');
        return {
            ...state,
            edited: {...state.edited, item: {...item, [name]: parsed}}
        };
    }
    
    if (name === 'photo' || name === 'alt') {
        const prop = name === 'photo' ? 'url' : name;
        return {
            ...state,
            edited: {...state.edited, item: {...item, photo: {...item.photo, [prop]: value}}}
        };
    }

    return {
        ...state,
        edited: {...state.edited, item: {...item, [name]: value}}
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

            const likedByMe = !item.likedByMe;
            const likes = likedByMe ? item.likes + 1 : item.likes - 1;

            return {
                ...item,
                likedByMe,
                likes
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

const reducePostToggleVisibility = (state, action) => {
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
};

const reducePostEdit = (state, action) => {
    const { posts } = state;
    const { payload: { id } } = action;

    const post = posts.find(el => el.id === id);
    if (post === undefined) {
        return;
    }

    return {
        ...state,
        edited: post
    };
};

const reduceCancel = (state) => {
    return {
        ...state,
        edited: empty
    };
};

const reducePostsRequest = (state) => {
    return {
        ...state,
        posts: {
            ...state.posts,
            loading: true,
            error: null
        }
    }
};

const reducePostsSuccess = (state, action) => {
    console.log(action.payload.items.map(item => ({...empty, ...item})));
    return {
        ...state,
        posts: {
            // items: action.payload.items,
            items: action.payload.items.map(item => ({...empty, ...item})),
            loading: false,
            error: null
        }
    }
};

const reducePostsFail = (state, action) => {
    return {
        ...state,
        posts: {
            ...state.posts,
            loading: false,
            error: action.payload.error
        }
    }
};

const reducePostSaveRequest = (state) => {
    return {
        ...state,
        edited: {
            ...state.edited,
            loading: true,
            error: null
        }
    };
};

const reducePostSaveSuccess = (state) => {
    return {
        ...state,
        edited: {
            edited: empty,
            loading: false,
            error: null
        }
    };
};

const reducePostSaveFail = (state, action) => {
    return {
        ...state,
        edited: {
            ...state.edited,
            loading: false,
            error: action.parsed.error
        }
    };
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
            return reducePostsRequest(state, action);
        case POSTS_SUCCESS:
            return reducePostsSuccess(state, action);
        case POSTS_FAIL:
            return reducePostsFail(state, action);
        case POST_SAVE_REQUEST:
            return reducePostSaveRequest(state, action);
        case POST_SAVE_SUCCESS:
            return reducePostSaveSuccess(state, action);
        case POST_SAVE_FAIL:
            return reducePostSaveFail(state, action);
        case POST_EDIT_SUBMIT:
            return reduceSubmit(state, action);
        case POST_EDIT_CHANGE:
            return reduceChange(state, action);
        case POST_EDIT_CANCEL:
            return reduceCancel(state, action);
        case POST_LIKE:
            return reducePostLike(state, action);
        case POST_REMOVE:
            return reducePostRemove(state, action);
        case POST_HIDE:
            return reducePostToggleVisibility(state, action);
        case POST_SHOW:
            return reducePostToggleVisibility(state, action);
        case POST_EDIT:
            return reducePostEdit(state, action);
        default:
            return state;
    }
};