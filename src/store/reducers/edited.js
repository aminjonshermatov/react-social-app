import {
    POST_EDIT_CANCEL,
    POST_EDIT_CHANGE,
    POST_SAVE_REQUEST,
    POST_SAVE_SUCCESS,
    POST_SAVE_FAIL
} from '../actions'

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
    item: empty,
    loading: false,
    error: null
};

export const editedReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_EDIT_CANCEL:
            return reduceCancel(state, action);
        case POST_EDIT_CHANGE:
            return reduceChange(state, action);
        case POST_SAVE_REQUEST:
            return reducePostSaveRequest(state, action);
        case POST_SAVE_SUCCESS:
            return reducePostSaveSuccess(state, action);
        case POST_SAVE_FAIL:
            return reducePostSaveFail(state, action);
        default:
            return state;
    }
};

const reducePostSaveRequest = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const reducePostSaveSuccess = (state) => {
    return {
        ...state,
        edited: empty,
        loading: false,
        error: null
    };
};

const reducePostSaveFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.parsed.error
    };
};

const reduceCancel = (state) => {
    return {
        ...state,
        edited: empty,
        loading: false,
        error: null
    };
};

const reduceChange = (state, action) => {
    const { item } = state;
    const { payload: { name, value } } = action;
    if (name === 'tags') {
        const parsed = value.split(' ');
        return {
            ...state,
            item: {
                ...item,
                [name]: parsed
            }
        };
    }
    
    if (name === 'photo' || name === 'alt') {
        const prop = name === 'photo' ? 'url' : name;
        return {
            ...state,
            item: {
                ...item,
                photo: {
                    ...item.photo,
                    [prop]: value
                }
            }
        };
    }

    return {
        ...state,
        item: {
            ...item,
            [name]: value
        }
    };
};