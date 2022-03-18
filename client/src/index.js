import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './/styles/index.scss';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//dev tools
import {composeWithDevTools} from "redux-devtools-extension";
import {BrowserRouter} from "react-router-dom";
import {getUsers} from "./actions/users.actions";
import {getPosts} from "./actions/post.actions";


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
