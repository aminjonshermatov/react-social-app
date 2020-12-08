import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import { logger } from './middleware'
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(logger, thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

window.store = store;

export default store;