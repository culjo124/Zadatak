import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MyModal from "./MyModal";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";

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
  },
}));

function Home(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <div>
      {!props.state.isApiLoading ? (
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
                  console.log(props.state)
                  props.sortAsc()
                }}>Sort ascending</Button>
                <Button onClick={() => {
                  console.log(props.state)
                  props.sortDes()
                }}>Sort descending</Button>
              </ButtonGroup>
            </div>
          </Container>
          <Grid container spacing={1} style={{ padding: 24 }}>
            {props.state.songs.map((currentSong) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={currentSong.id}>
                <MyModal song={currentSong} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
          "Loading..."
        )}
    </div>
  );
}

export default Home;
