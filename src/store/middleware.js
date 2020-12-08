/* eslint-disable no-unused-vars */
export const logger = store => next => action => {
    console.log(action);
    return next(action);
};

export const fn = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch);
    }

    return next(action);
};