import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Home from "../containers/Home"
import Register from "../containers/Register"
import Gallery from "../containers/Gallery"

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
                <Route path="/" exact component={Register} />
                <Route path="/home" exact component={Home} />
                <Route path="/gallery" exact component={Gallery} />
            </BrowserRouter>
        </Provider>

    )

}