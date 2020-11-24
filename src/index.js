import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from "./store";
import { postsRequest, postsSuccess, postsFail } from './store/actions'

store.dispatch(postsRequest());
fetch('https://aminjonshermatov-nodeapp.herokuapp.com/posts.get')
  .then(response => {
    if (!response.ok) {
      throw new Error('bad http status');
    }
    
    return response.json();
  })
  .then(body => {
    console.log(body);
    store.dispatch(postsSuccess(body));
  })
  .catch(error => {
    console.log(error);
    store.dispatch(postsFail(error));
  });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
