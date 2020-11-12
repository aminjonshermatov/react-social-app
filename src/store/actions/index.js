export const POST_EDIT_SUBMIT = 'POST_EDIT_SUBMIT';
export const POST_EDIT_CHANGE = 'POST_EDIT_CHANGE';
export const POST_EDIT_CANCEL = 'POST_EDIT_CANCEL';
export const POST_LIKE = 'POST_LIKE';
export const POST_REMOVE = 'POST_REMOVE';
export const POST_HIDE = 'POST_HIDE';
export const POST_SHOW = 'POST_SHOW';
export const POST_EDIT = 'POST_EDIT';

export const editSubmit = () => {
    return {
        type: POST_EDIT_SUBMIT,
        payload: {}
    };
};

export const editCancel = () => {
    return {
        type: POST_EDIT_CANCEL,
        payload: {}
    };
};

export const editChange = (name, value) => {
    return {
        type: POST_EDIT_CHANGE,
        payload: {name, value}
    };
};

export const like = id => {
    return {
        type: POST_LIKE,
        payload: {id}
    };
};

export const remove = id => {
    return {
        type: POST_REMOVE,
        payload: {id}
    };
};

export const edit = id => {
    return {
        type: POST_EDIT,
        payload: {id}
    };
};

export const hide = id => {
    return {
        type: POST_HIDE,
        payload: {id}
    };
};

export const show = id => {
    return {
        type: POST_SHOW,
        payload: {id}
    };
};