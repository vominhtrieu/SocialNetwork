import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  avatar: {
    width: 50,
    height: 50,
    float: "left",
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    cursor: "default",
  },
  mutualFriend: {
    fontSize: 14,
    cursor: "default",
    lineHeight: "1em",
  },
  button: {
    marginRight: 5,
    textTransform: "none",
  },
}));

function FriendRequest() {
  const classes = useStyle();
  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="block">
            <Avatar className={classes.avatar}></Avatar>
            <Typography className={classes.name} variant="h5">
              Crush
            </Typography>
            <Typography className={classes.mutualFriend} color="textSecondary">
              5 mutual friends
            </Typography>
          </Box>
          <Box marginTop={1}>
            <Button
              className={classes.button}
              size="small"
              color="primary"
              variant="contained"
            >
              Accept
            </Button>
            <Button
              className={classes.button}
              size="small"
              color="secondary"
              variant="outlined"
            >
              Reject
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FriendRequest;
