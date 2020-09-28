import React from "react";
import "./App.css";
import Auth from "./container/Auth";
import Home from "./container/Home";
import Friends from "./component/Friends/Friends";
import Messages from "./container/Messages";
import Notifications from "./component/Notifications";
import About from "./component/About/About";
import MainNavbar from "./component/Navbar/MainNavbar";

import PrivateRoute from "./component/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Grid, Box, makeStyles, withWidth, isWidthUp } from "@material-ui/core";
import Profile from "./container/Profile";
import ActiveList from "./container/ActiveList";

import { connect } from "react-redux";
import { getProfile } from "./actions/getProfile";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
  },
  content: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.only("sm")]: {
      paddingTop: theme.spacing(15),
    },
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(14),
    },
  },
}));

function App(props) {
  const { isPending, error, getProfile } = props;
  const classes = useStyles();

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isPending) return <Box>Loading</Box>;
  if (error) {
    return (
      <Box>
        Cannot connect to server. Please check your internet connection and try
        again
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
                      <PrivateRoute exact path="/friends" component={Friends} />
                      <PrivateRoute path="/messages" component={Messages} />
                      <PrivateRoute
                        exact
                        path="/notifications"
                        component={Notifications}
                      />
                      <Route path="/about" component={About} />
                      <PrivateRoute path="/:id" component={Profile} />
                    </Switch>
                  </Box>
                </Grid>
                <Grid item xs={false} md={3}>
                  {isWidthUp("md", props.width) ? (
                    <Box position="fixed" top={0} width="100%" height="100vh" paddingLeft={2} className={classes.content}>
                      <ActiveList />
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isPending: state.isPending,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App));
