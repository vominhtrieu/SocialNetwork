import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { HOST } from "../../config/constant";
import UnfriendIcon from "@material-ui/icons/RemoveCircleOutline";
import BlockIcon from "@material-ui/icons/Block";

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
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  name: {
    paddingTop: 2,
    marginBottom: 0,
    fontWeight: "bold",
    lineHeight: 1.1,
    fontSize: 20,
  },
}));

function FriendInfo(props) {
  const { user } = props;

  const Unfriend = () => {
    fetch(HOST + "/unfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ friendId: user.id }),
    });
  };
  const classes = useStyle();
  return (
    <Box marginTop={2} marginBottom={2}>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="block">
            <Link className={classes.link} to={"/" + user.id}>
              <Avatar
                src={HOST + "/image/" + user.avatar}
                className={classes.avatar}
              ></Avatar>
            </Link>
            <Link className={classes.link} to={"/" + user.id}>
              <Typography className={classes.name} variant="h5">
                {user.firstName + " " + user.lastName}
              </Typography>
            </Link>
            <Box padding={0}>
              <IconButton onClick={Unfriend} size="small">
                <UnfriendIcon color="secondary" size="large" />
              </IconButton>
              <IconButton size="small">
                <BlockIcon color="error" size="large" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FriendInfo;
