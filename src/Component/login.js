import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { capitalize } from "lodash";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 100,
    textAlign: "center",
  },
});

export default function LoginForm() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const handleClose = () => {
    setOpen(false);
    history.replace("/home/");
  };
  const clases = useStyles();
  const history = useHistory();
  const handleClick = async () => {
    await fetch("http://127.0.0.1:8000/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          history.replace("/posts/");
        } else {
          setError(data);
        }
      });
  };
  const handleChange = (e) => {
    const copyUser = { ...user };
    copyUser[e.target.name] = e.target.value;
    setUser(copyUser);
  };
  const fields = ["username", "password"];
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseRoundedIcon />
          </Button>
        </DialogActions>
        <DialogContent style={{ width: 400 }}>
          {fields.map((field) => (
            <div>
              <TextField
                value={user.field}
                onChange={handleChange}
                name={field}
                fullWidth
                margin="dense"
                id={field}
                size="medium"
                label={capitalize(field)}
              />
              {error[field] && (
                <div className="alert alert-danger">{error[field]}</div>
              )}
            </div>
          ))}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            fullWidth
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
        <div className={clases.root}>
          <Typography color="primary">
            Don't have an account?
            <Link to="/register/">SignUp</Link>
          </Typography>
        </div>
      </Dialog>
    </div>
  );
}
