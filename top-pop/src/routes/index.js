import React, { useState } from 'react'
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

const pages = {
    Register: <Register />,
    Home: <Home />,
    Gallery: <Gallery />
}
const buttons = ["Register", "Home", "Gallery"]

export default function Routes() {
    const [index, setIndex] = useState("Register")
    const onClick = (e) => setIndex(e.target.id)
    const transitions = useTransition(index, p => p, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
    })

    return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={true}>
                <div className="simple-trans-main" >
                    {buttons.map((key) => {
                        return <button id={key} key={key} onClick={onClick}
                            style={{ color: "black", backgroundColor: "transparent" }}
                        >{key}</button>
                    })}
                    {transitions.map(({ item, props, key }) => {
                        const Page = ({ style }) =>
                            <animated.div style={{ ...style, background: 'lightpink' }}>{pages[item]}</animated.div>
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