import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  IconButton,
  makeStyles,
  Card,
  Button,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CameraIcon from "@material-ui/icons/CameraAlt";
import TimelineIcon from "@material-ui/icons/Timeline";
import ImageIcon from "@material-ui/icons/Image";
import FriendIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import io from "socket.io-client";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    height: 140,
    paddingTop: 160,
  },
  avatar: {
    width: 150,
    height: 150,
    border: "5px solid white",
    margin: "auto",
  },
  avatarContainer: {
    position: "relative",
    width: 160,
    margin: "auto",
  },
  name: {
    position: "relative",
    fontSize: 28,
    marginTop: 20,
    color: "black",
    fontWeight: "bold",
    textShadow: "1px 1px white",
  },
  tab: {
    minWidth: 50,
  },
  addCoverButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  addAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 15,
    "&>*": {
      color: "white",
    },
  },
  addImageButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    "&>*": {
      color: "white",
    },
  },
  addFile: {
    display: "none",
  },
}));

function ProfileIntro(props) {
  const { user, profileUser, uploadAvatar, uploadCover } = props;
  const url = `/${profileUser.id}`;
  let path = props.history.location.pathname;
  path = path.substr(path.length - 1) === "/" ? path.slice(0, -1) : path;
  const classes = useStyles();

  function addFriend() {
    fetch(HOST + "/addfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ addId: profileUser.id }),
    }).then((res) => {
      if (res.ok) {
        const socket = io(HOST);
        socket.emit("sendFriendRequest", { friendId: profileUser.id });
      }
    });
  }

  return (
    <Card variant="outlined">
      <Box
        className={classes.root}
        style={{
          backgroundImage: "url(" + HOST + "/image/" + profileUser.cover + ")",
        }}
      >
        {user.id === Number(profileUser.id) ? (
          <Box className={classes.addCoverButton}>
            <input
              type="file"
              accept="image/*"
              onChange={uploadCover}
              className={classes.addFile}
              id="addCover"
            />
            <label htmlFor="addCover">
              <IconButton className={classes.addImageButton} component="span">
                <CameraIcon />
              </IconButton>
            </label>
          </Box>
        ) : null}

        <Box className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            src={
              profileUser.avatar ? `${HOST}/image/${profileUser.avatar}` : null
            }
          />
          <Box className={classes.addAvatarButton}>
            {user.id === Number(profileUser.id) ? (
              <Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  className={classes.addFile}
                  id="addAvatar"
                />
                <label htmlFor="addAvatar">
                  <IconButton
                    className={classes.addImageButton}
                    component="span"
                  >
                    <CameraIcon />
                  </IconButton>
                </label>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        style={{ backgroundColor: "white" }}
      >
        <Typography className={classes.name} align="center">
          {profileUser.firstName + " " + profileUser.lastName}
        </Typography>

        {/* Add Friend/Message row */}
        {user.id !== Number(profileUser.id) ? (
          <Box
            marginTop={1}
            marginLeft={2}
            marginRight={2}
            display="flex"
            flexGrow={1}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ flexGrow: 1 }}
              startIcon={<PersonAddIcon />}
            >
              Add Friend
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: 16 }}
            >
              <MoreIcon />
            </Button>
          </Box>
        ) : null}
        <Tabs value={path} variant="fullWidth">
          <Tab
            component={Link}
            to={`${url}`}
            value={`${url}`}
            className={classes.tab}
            label={<TimelineIcon />}
          />
          <Tab
            component={Link}
            to={`${url}/images`}
            value={`${url}/images`}
            className={classes.tab}
            label={<ImageIcon />}
          />
          <Tab
            component={Link}
            to={`${url}/friends`}
            value={`${url}/friends`}
            className={classes.tab}
            label={<FriendIcon />}
          />
          <Tab
            component={Link}
            to={`${url}/detail`}
            value={`${url}/detail`}
            className={classes.tab}
            label={<PersonIcon />}
          />
        </Tabs>
      </Box>
    </Card>
  );
}

export default withRouter(ProfileIntro);
