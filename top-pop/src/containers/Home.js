import React, { useEffect } from "react";
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
                  localActions.sortAsc()
                }}>Add to local storage</Button>
                <Button onClick={() => {
                  localActions.sortAsc()
                }}>Clear local storage</Button>
              </ButtonGroup>
              <div><TextField id="standard-basic" label="Standard" /></div>
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
