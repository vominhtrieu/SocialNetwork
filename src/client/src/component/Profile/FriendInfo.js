import React from "react";
import { Typography, Avatar, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API_HOST } from "../../config/constant";
import UnfriendIcon from "@material-ui/icons/RemoveCircleOutline";
import AddFriendIcon from "@material-ui/icons/PersonAdd";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  link: {
    textDecoration: "none",
    marginLeft: theme.spacing(1),
    color: theme.palette.common.black,
  },
  name: {
    fontWeight: "bold",
  },
}));

function FriendInfo(props) {
  const { friend, user } = props;

  const unFriend = () => {
    fetch(API_HOST + "/unfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ friendId: friend.id }),
    }).then((res) => {
      if (res.ok) {
        //...
      }
    });
  };

  const classes = useStyle();
  return (
    <Box display="flex" alignItems="center" marginTop={1} marginBottom={1}>
      <Link className={classes.link} to={"/" + friend.id}>
        <Avatar src={API_HOST + "/image/" + friend.avatar} className={classes.avatar}></Avatar>
      </Link>
      <Link className={classes.link} to={"/" + friend.id}>
        <Typography className={classes.name} variant="h6">
          {friend.firstName + " " + friend.lastName}
        </Typography>
      </Link>
      <Box flexGrow={1} display="flex" justifyContent="flex-end">
        {user.id === friend.id ? null : friend.isFriend ? (
          <Button variant="contained" color="secondary" onClick={unFriend} startIcon={<UnfriendIcon />}>
            Unfriend
          </Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<AddFriendIcon />}>
            Add Friend
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default FriendInfo;
