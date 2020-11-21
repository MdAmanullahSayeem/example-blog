import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { capitalize } from "lodash";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useHistory } from "react-router";
import { useState } from "react";

export default function RegisterForm() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});

  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    history.replace("/home/");
  };
  const handleChange = (e) => {
    const copyUser = { ...user };
    copyUser[e.target.name] = e.target.value;
    setUser(copyUser);
  };
  const handleClick = async () => {
    await fetch("http://127.0.0.1:8000/api/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          history.replace("");
        } else {
          setError(data);
        }
      });
  };

  const fields = ["username", "email", "password", "confirm"];
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseRoundedIcon />
          </Button>
        </DialogActions>
        <DialogContent style={{ width: 600 }}>
          {fields.map((field) => (
            <div>
              <TextField
                value={user.name}
                name={field}
                fullWidth
                margin="dense"
                id={field}
                size="medium"
                onChange={handleChange}
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
            variant="contained"
            size="small"
            onClick={handleClick}
            color="primary"
          >
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
