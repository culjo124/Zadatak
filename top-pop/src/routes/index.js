import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Home from "../containers/Home"

import createRootReducer from "../reducers";

const preloadedState = undefined;

const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(ReduxThunk))
);

export default function Routes() {
    return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={true}>
                <Route path="/" exact component={Home} />
            </BrowserRouter>
        </Provider>

    )

}