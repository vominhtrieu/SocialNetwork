import React from "react";
import Auth from "./container/Auth";
import Home from "./container/Home";
import Friends from "./container/Friends";
import Messages from "./container/Messages";
import Notification from "./container/Notification";
import About from "./component/About/About";
import MainNavbar from "./component/Navbar/MainNavbar";
import PrivateRoute from "./component/Common/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
  makeStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import Profile from "./container/Profile";
import ActiveList from "./container/ActiveList";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { getProfile } from "./actions/getProfile";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
  },
  content: {
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(12),
    },
  },
}));

function App(props) {
  const { isPending, error, getProfile } = props;
  const classes = useStyles();
  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isPending)
    return (
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <ReactLoading type="bubbles" color="black" />
        <Typography variant="body2">Loading</Typography>
      </Box>
    );

  if (error && error.message !== "Unauthenticated") {
    return (
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <ReactLoading type="bubbles" color="black" />
        <Typography variant="body2">Waiting for internet connection</Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={Auth} />
          <Route exact path="/signup" component={Auth} />
          <Route path="*">
            {!error ? (
              <React.Fragment>
                <MainNavbar />
                <Box className={classes.container}>
                  <Grid container style={{ flexGrow: 1 }}>
                    <Grid item xs={false} md={3} />
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{ flexGrow: 1, display: "flex" }}
                    >
                      <Box
                        className={classes.content}
                        display="flex"
                        marginX="auto"
                        width="min(100%, 580px)"
                      >
                        <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          <PrivateRoute
                            exact
                            path="/friends"
                            component={Friends}
                          />
                          <PrivateRoute path="/messages" component={Messages} />
                          <PrivateRoute
                            exact
                            path="/notifications"
                            component={Notification}
                          />
                          <Route path="/about" component={About} />
                          <PrivateRoute path="/:id" component={Profile} />
                        </Switch>
                      </Box>
                    </Grid>

                    {isWidthUp("md", props.width) ? (
                      <Grid item xs={false} md={3}>
                        <Box
                          position="fixed"
                          top={0}
                          width="100%"
                          height="100vh"
                          paddingLeft={2}
                        >
                          <ActiveList />
                        </Box>
                      </Grid>
                    ) : null}
                  </Grid>
                </Box>
              </React.Fragment>
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isPending: state.isPending,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App));
