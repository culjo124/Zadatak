import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, compose, createStore } from "redux";
import { BrowserRouter, Route } from 'react-router-dom';
import ReduxThunk from "redux-thunk";
import createRootReducer from "./reducers";
import { Provider } from "react-redux";

const preloadedState = undefined;

const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(ReduxThunk))
);

ReactDOM.render(<Provider store={store}>
    <BrowserRouter forceRefresh={true}>
        <Route path="/" exact component={App} />
    </BrowserRouter>
</Provider>, document.getElementById("root"));

serviceWorker.unregister();
