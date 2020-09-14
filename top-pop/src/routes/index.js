import React, { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Home from "../containers/Home"
import Register from "../containers/Register"
import Gallery from "../containers/Gallery"
import logger from 'redux-logger'
import createRootReducer from "../reducers";
import { useTransition, animated } from 'react-spring'

const preloadedState = undefined;

const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(ReduxThunk), applyMiddleware(logger))
);

const pages = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}><Register /></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}><Home /></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}><Gallery /></animated.div>,
]

export default function Routes() {
    const [index, set] = useState(0)
    const onClick = useCallback(() => set(state => (state + 1) % pages.length), [])
    const transitions = useTransition(index, p => p, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
        config: { duration: 1000 }
    })
    return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={true}>
                <div className="simple-trans-main" >
                    <button onClick={onClick} style={{ color: "black", backgroundColor: "transparent", width: "100%" }}>Slide</button>
                    {transitions.map(({ item, props, key }) => {
                        const Page = pages[item]
                        return <Page key={key} style={props} />
                    })}
                </div>
            </BrowserRouter>
        </Provider>
    )
    /*return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={true}>
                <Route path="/" exact component={Register} />
                <Route path="/home" exact component={Home} />
                <Route path="/gallery" exact component={Gallery} />
            </BrowserRouter>
        </Provider>

    )*/

}