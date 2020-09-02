import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import "react-perfect-scrollbar/dist/css/styles.css";
import Home from "../components/Home";
import * as actions from "../actions"

function App() {

  const dispatch = useDispatch();

  const localActions = {
    sortAsc: () => dispatch(actions.song.sortAsc()),
    sortDes: () => dispatch(actions.song.sortDes()),
    getSongs: () => dispatch(actions.song.getSongs()),

  };

  const globalState = {
    songs: useSelector(state => state.song.songs),
    isApiLoading: useSelector(state => state.song.isApiLoading)
  };

  useEffect(() => {
    localActions.getSongs();
  }, []);

  const sortAsc = () => {
    localActions.sortAsc()
  }

  const sortDes = () => {
    localActions.sortDes()
  }

  return (<Home state={globalState} sortAsc={sortAsc} sortDes={sortDes} />)
}

export default App;

