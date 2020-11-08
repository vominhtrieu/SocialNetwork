import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DialogAlert from './component/Dialog/AlertDialog';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { profile as profileReducer } from './reducers/profile';
//import logger from 'redux-logger';

const middlewares = [reduxThunk];
const store = compose(applyMiddleware(...middlewares))(createStore)(
  profileReducer
);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <DialogAlert />
    <App />
  </Provider>,
  /* </React.StrictMode> */ document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
