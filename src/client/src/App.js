import React from 'react';
import Auth from './container/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { getProfile } from './actions/getProfile';
import { Redirect } from 'react-router-dom';
import Main from './container/Main';

function App(props) {
  const { isPending, error, getProfile } = props;
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

  if (error && error.message !== 'Unauthenticated') {
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
            {props.user && Object.keys(props.user).length > 0 ? (
              <Main />
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
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
