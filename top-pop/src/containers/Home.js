import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MyModal from "../components/MyModal";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";
import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import Footer from "../components/footer";
import TextField from '@material-ui/core/TextField';
import "./home.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    alignItems: "center",
  }
}));

function Home() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const localActions = {
    sortAsc: () => dispatch(actions.song.sortAsc()),
    sortDes: () => dispatch(actions.song.sortDes()),
    getSongs: () => dispatch(actions.song.getSongs()),
    clearStorage: () => dispatch(actions.song.clearStorage())
  };

  const globalState = {
    songs: useSelector(state => state.song.songs),
    isApiLoading: useSelector(state => state.song.isApiLoading),
    comments: useSelector(state => state.song.comments)
  };

  useEffect(() => {
    localActions.getSongs();
  }, []);

  useEffect(() => localStorage.setItem('comments', globalState.comments), [globalState.comments])

  function addToStorage() {
    dispatch(actions.song.addToStorage(text))
    setText("")
  }

  function handleChange(e) {
    setText(e.target.value)
  }

  return (
    <div className="site">
      <div className="siteContent">
        <div className="main">
          {!globalState.isApiLoading ? (
            <div>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <MusicNoteSharpIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    TOP POP
              </Typography>
                  <ButtonGroup
                    className={classes.button}
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={() => {
                      localActions.sortAsc()
                    }}>Sort ascending</Button>
                    <Button onClick={() => {
                      localActions.sortDes()
                    }}>Sort descending</Button>
                  </ButtonGroup>
                </div>
              </Container>
              <Grid container spacing={1} style={{ padding: 24 }}>
                {globalState.songs.map((currentSong) => (
                  <Grid item xs={12} sm={6} lg={4} xl={3} key={currentSong.id}>
                    <MyModal song={currentSong} />
                  </Grid>
                ))}
              </Grid>
              <ButtonGroup
                className={classes.button}
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => {
                  addToStorage()
                }}>Add to local storage</Button>
                <Button onClick={() => {
                  localActions.clearStorage()
                }}>Clear local storage</Button>
              </ButtonGroup>
              <div><TextField id="standard-basic" label="Standard" value={text} onChange={handleChange} /></div>
              {!globalState.comments ? null :
                <Grid container spacing={1} style={{ padding: 24 }}>
                  {console.log(globalState.comments)}
                  {globalState.comments[0].split(",").map((currentComment) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={currentComment}>
                      <Button>{currentComment}</Button>
                    </Grid>
                  ))}
                </Grid>}
            </div>
          ) : (
              <Loader />
            )}
        </div>
      </div>
      <Footer />
    </div >
  );

}

export default Home;