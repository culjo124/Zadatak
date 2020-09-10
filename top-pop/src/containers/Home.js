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
import "../styles/home.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "red"
  },
  button: {
    alignItems: "center",
    marginLeft: "25px"
  },
  text: {
    marginLeft: "25px"
  }
}));

function Home() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(localStorage.getItem('comments'))

  const localActions = {
    sortAsc: () => dispatch(actions.song.sortAsc()),
    sortDes: () => dispatch(actions.song.sortDes()),
    getSongs: () => dispatch(actions.song.getSongs()),
  };

  const globalState = {
    songs: useSelector(state => state.song.songs),
    isApiLoading: useSelector(state => state.song.isApiLoading),
  };

  useEffect(() => {
    localActions.getSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => localStorage.setItem('comments', comments), [comments])

  function addToStorage() {
    if (text.length > 0) {
      comments === null || comments === "" ? setComments(text) :
        setComments(comments.concat("\\\\" + text))
      setText("")
    }
  }

  function clearStorage() {
    setComments("")
  }

  function removeFromStorage(text) {
    const index = comments.split("\\\\").indexOf(text)
    const length = comments.split("\\\\").length

    index === 0 || index === length - 1 ?
      setComments(comments.split("\\\\").splice(0, index) +
        comments.split("\\\\").splice(index + 1, length)
      ) : setComments(comments.split("\\\\").splice(0, index) + "\\\\" +
        comments.split("\\\\").splice(index + 1, length))
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
                  <Typography variant="h5">
                    TOP POP
              </Typography>
                  <ButtonGroup
                    styles={{ color: "green" }}
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
                  clearStorage()
                }}>Clear local storage</Button>
              </ButtonGroup>
              <div><TextField className={classes.text} label="Standard" value={text} onChange={handleChange} /></div>
              {comments === null || comments === "" ? null :
                <Grid container spacing={1} style={{ padding: 24 }}>
                  {comments.split("\\\\").map((currentComment) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={currentComment}>
                      <Button variant="outlined" color="primary" onClick={() => removeFromStorage(currentComment)}>{currentComment}</Button>
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
