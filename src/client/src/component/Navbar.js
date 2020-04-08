import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#1e88e5',
      padding: '0 10vw'
    },
    title: {
      flexGrow: 1,
      cursor: 'default'
    },
  }));

  
  export default function Navbar() {
    const classes = useStyles();
  
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography align='center' variant="h6" className={classes.title}>
            MTN Social Network
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }