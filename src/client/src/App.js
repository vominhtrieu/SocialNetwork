import React from "react";
import "./App.css";
import Auth from "./container/Auth";
import Home from "./container/Home";
import Friends from "./component/Friends/Friends";
import Messages from "./container/Messages";
import Notifications from "./component/Notifications";
import TitleNavbar from "./component/Navbar/TitleNavbar";
import MainNavbar from "./component/Navbar/MainNavbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { Grid, Box } from "@material-ui/core";
import Profile from "./container/Profile";

import { connect } from "react-redux";
import { getProfile } from "./actions/getProfile";

class App extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isPending, error } = this.props;
    if (isPending) return <Box>Loading</Box>;
    if (error) {
      return (
        <Box>
          Cannot connect to server. Please check your internet connenction and
          try again
        </Box>
      );
    }
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={TitleNavbar} />
            <Route exact path="/signup" component={TitleNavbar} />
            <Route path="*" component={MainNavbar} />
          </Switch>
          <Grid container className={{alignItems: "stretch"}}>
            <Grid item xs={false} md={3} />
            <Grid item xs={12} md={6}>
              <Box width="min(100%, 600px)" margin="auto">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/friends" component={Friends} />
                  <PrivateRoute path="/messages" component={Messages} />
                  <PrivateRoute
                    exact
                    path="/notifications"
                    component={Notifications}
                  />
                  <Route exact path="/signin" component={Auth} />
                  <Route exact path="/signup" component={Auth} />
                  <PrivateRoute path="/:id" component={Profile} />
                </Switch>
              </Box>
            </Grid>
            <Grid item xs={false} md={3} />
          </Grid>
        </BrowserRouter>
      </React.Fragment>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
