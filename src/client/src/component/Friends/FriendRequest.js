import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { HOST } from "../../config/constant";
import moment from "moment/moment";
import io from "socket.io-client";

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
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    cursor: "default",
    lineHeight: "1em",
  },
  button: {
    marginRight: 5,
    textTransform: "none",
  },
}));

function FriendRequest(props) {
  const { request } = props;
  const [socket] = React.useState(io(HOST));

  function respondRequest(response) {
    fetch(HOST + "/respondfriendrequest", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    }).then((res) => {
      if (res.ok) {
        socket.emit("respondFriendRequest");
        props.deleteRequest(request.requestId);
      }
    });
  }

  const classes = useStyle();
  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="block">
            <Link className={classes.link} to={"/" + request.userId}>
              <Avatar
                src={HOST + "/image/" + request.avatar}
                className={classes.avatar}
              ></Avatar>
            </Link>
            <Link className={classes.link} to={"/" + request.userId}>
              <Typography className={classes.name} variant="h5">
                {request.firstName + " " + request.lastName}
              </Typography>
            </Link>
            <Typography className={classes.date} color="textSecondary">
              {moment(request.date).fromNow()}
            </Typography>
          </Box>
          <Box marginTop={1}>
            <Button
              className={classes.button}
              size="small"
              color="primary"
              variant="contained"
              onClick={() => {
                respondRequest({ accept: true, requestId: request.requestId });
              }}
            >
              Accept
            </Button>
            <Button
              className={classes.button}
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => {
                respondRequest({ accept: false, requestId: request.requestId });
              }}
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
