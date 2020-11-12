import {
    POST_EDIT,
    POST_EDIT_CANCEL,
    POST_EDIT_CHANGE,
    POST_EDIT_SUBMIT,
    POST_LIKE,
    POST_REMOVE,
    POST_HIDE,
    POST_SHOW
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
    posts: [],
    edited: empty
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
    const { edited } = state;
    const { payload: { name, value } } = action;
    if (name === 'tags') {
        const parsed = value.split(' ');
        return {
            ...state,
            edited: {...edited, [name]: parsed}
        };
    }
    
    if (name === 'photo' || name === 'alt') {
        const prop = name === 'photo' ? 'url' : name;
        return {
            ...state,
            edited: {...edited, photo: {...edited.photo, [prop]: value}}
        };
    }

    return {
        ...state,
        edited: {...edited, [name]: value}
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

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_EDIT_SUBMIT:
            return reduceSubmit(state);
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