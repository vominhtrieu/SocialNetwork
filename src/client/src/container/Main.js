import React from 'react';
import Friends from '../container/Friends';
import Messages from '../container/Messages';

import Home from './Home';
import Notification from './Notification';
import About from '../component/About/About';
import MainNavbar from '../component/Navbar/MainNavbar';
import LeftNavigation from '../component/Navbar/LeftNavigation';

import { Switch, Route } from 'react-router-dom';
import { Box, Grid, makeStyles, withWidth, isWidthUp } from '@material-ui/core';
import PrivateRoute from '../component/Common/PrivateRoute';
import Profile from './Profile';
import ActiveList from './ActiveList';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
  },
  content: {
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(12),
    },
  },
}));

function Main(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MainNavbar />
      <Box className={classes.container}>
        <Grid container style={{ flexGrow: 1 }}>
          <Grid item xs={false} md={3}>
            {isWidthUp('md', props.width) ? <LeftNavigation /> : null}
          </Grid>
          <Grid item xs={12} md={6} style={{ flexGrow: 1, display: 'flex' }}>
            <Box
              className={classes.content}
              display="flex"
              flexDirection="column"
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
                  component={Notification}
                />
                <Route path="/about" component={About} />
                <PrivateRoute path="/:id" component={Profile} />
              </Switch>
            </Box>
          </Grid>

          <Grid item xs={false} md={3}>
            {isWidthUp('md', props.width) ? <ActiveList /> : null}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withWidth()(Main);
