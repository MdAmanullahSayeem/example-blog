import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 70,
  },
  appBar: {
    background: "black",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function Nabvar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography style={{ marginRight: 30 }}>
            <Link style={{ color: "white" }} to="/home/">
              Home
            </Link>
          </Typography>
          <Typography color="inherit" style={{ flex: "1" }}>
            <Link style={{ color: "white" }} to="/posts/">
              Posts
            </Link>
          </Typography>
          <Typography color="inherit">
            <Link style={{ color: "white" }} to="/login/">
              Login
            </Link>
          </Typography>
          <Typography color="inherit">
            <Link style={{ color: "white" }} to="/register/">
              | Register
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
