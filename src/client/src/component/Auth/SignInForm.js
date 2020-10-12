import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReactLoading from "react-loading";
import { HOST } from "../../config/constant";

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
    margin: 0,
    padding: 0,
  },
}));

function SignInForm(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  function LogUserIn(data) {
    setIsSigningIn(true);
    fetch(`${HOST}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((message) => {
        setAlertOpen(true);
        setAlertTitle(message);
        if (message === "Successfully Login") {
          props.history.push("/");
        } else {
          setIsSigningIn(false);
        }
      })
      .catch((err) => setIsSigningIn(false));
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(LogUserIn)} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/*Remember to fix this when enable StrictMode, due to problem with Collapse component*/}
            <Collapse in={alertOpen}>
              <Alert
                severity="error"
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
          <Grid item xs={12}>
            <TextField
              inputProps={{
                ref: register,
              }}
              variant="outlined"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{
                ref: register,
              }}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSigningIn}
              fullWidth
            >
              {!isSigningIn ? (
                "Sign In"
              ) : (
                <ReactLoading
                  type="bubbles"
                  height={24}
                  width={24}
                  color="black"
                />
              )}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Link align="center" href="#" variant="body2">
                Forgot password
              </Link>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}

export default SignInForm;
