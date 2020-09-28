import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  checkBox: {
    padding: "0 4px 0 0",
  },
  rememberBox: {
    transform: "scale(0.95)",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

function validatePassword(event) {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  if (password.value !== confirmPassword.value)
    confirmPassword.setCustomValidity("Passwords Don't Match");
  else confirmPassword.setCustomValidity("");
}

function SignUpForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("");
  const [alertType, setAlertType] = React.useState("success");

  const RegisterUser = (data) => {
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((message) => {
        setAlertOpen(true);
        setAlertTitle(message);
        setAlertType(
          message === "Successfully registered" ? "success" : "error"
        );
        if (message === "Successfully registered") history.push("/signin");
      })
      .catch(console.log);
  };

  return (
    <form onSubmit={handleSubmit(RegisterUser)} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Collapse in={alertOpen}>
            <Alert
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertTitle}
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{
              ref: register,
            }}
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{
              ref: register,
            }}
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            inputProps={{
              ref: register,
              pattern: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
              title: "Email is not valid",
            }}
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputProps={{
              ref: register,
              pattern: "[A-Za-z\\d@$!%*#?&]{8,60}$",
              title:
                "Password must have length between 8 and 60 character and contain only English letters, numbers and special characters",
            }}
            onChange={validatePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onKeyUp={validatePassword}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignUpForm;
