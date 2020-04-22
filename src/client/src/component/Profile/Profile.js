import React, { Fragment } from "react";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostAdd from "../Home/PostAdd";
import Post from "../Home/Post";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CameraIcon from "@material-ui/icons/CameraAlt";
import TimelineIcon from "@material-ui/icons/Timeline";
import ImageIcon from "@material-ui/icons/Image";
import FriendIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    border: "5px solid white",
    margin: "auto",
  },
  avatarContainer: {
    position: "relative",
  },
  name: {
    position: "relative",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textShadow: "1px 1px white",
  },
  blur: {
    position: "absolute",
    bottom: 0,
    height: 150,
    width: "100%",
    backgroundImage:
      "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.75) 50%, rgba(255,255,255,0))",
    zIndex: 0,
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
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.6)"
    },
    "&>*": {
      color: "white",
    },
  },
  addFile: {
    display: "none",
  },
}));

function AddImageButton() {
  const classes = useStyles();
  return (
    <Fragment>
      <input
        type="file"
        accept="image/*"
        className={classes.addFile}
        id="addAvatar"
      />
      <label htmlFor="addAvatar">
        <IconButton className={classes.addImageButton} component="span">
          <CameraIcon />
        </IconButton>
      </label>
    </Fragment>
  );
}

function Profile() {
  const classes = useStyles();
  return (
    <Box width="100%">
      <Box className={classes.root} height={250} paddingTop={10}>
        <Box className={classes.blur} />
        <Box className={classes.addCoverButton}>
          <AddImageButton />
        </Box>
        <Box width={160} margin="auto" className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
          />
          <Box className={classes.addAvatarButton}>
            <AddImageButton />
          </Box>
        </Box>
        <Typography className={classes.name} align="center">
          Crush
        </Typography>
        <Tabs variant="fullWidth" value={0}>
          <Tab disableRipple className={classes.tab} label={<TimelineIcon />} />
          <Tab disableRipple className={classes.tab} label={<ImageIcon />} />
          <Tab disableRipple className={classes.tab} label={<FriendIcon />} />
          <Tab disableRipple className={classes.tab} label={<PersonIcon />} />
        </Tabs>
      </Box>
      <PostAdd />
      <Post />
    </Box>
  );
}

export default Profile;
