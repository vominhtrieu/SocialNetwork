import React from "react";
import { AppBar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#1e88e5",
  },
}));

function TitleNavbar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Box marginY={2} display="flex" justifyContent="center">
        <Typography align="center" variant="h5">
          MTN Social Network
        </Typography>
      </Box>
    </AppBar>
  );
}

export default TitleNavbar;
