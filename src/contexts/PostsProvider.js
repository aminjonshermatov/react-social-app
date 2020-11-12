import React, { useReducer, useMemo } from 'react';
import PostsContext from './PostsContext';
import { reducer, initialState } from '../store/reducers';

export default function PostsProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <PostsContext.Provider value={value}>
            {props.children}
        </PostsContext.Provider>
    );
}