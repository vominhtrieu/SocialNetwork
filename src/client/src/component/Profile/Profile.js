import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PostAdd from "../Home/PostAdd";
import Post from "../Home/Post";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CameraIcon from "@material-ui/icons/CameraAlt";
import TimelineIcon from "@material-ui/icons/Timeline";
import ImageIcon from "@material-ui/icons/Image";
import FriendIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

import { getProfile } from "../../actions/getProfile";
import { connect } from "react-redux";
import { HOST } from "../../config/constant";

const style = (theme) => ({
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
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    "&>*": {
      color: "white",
    },
  },
  addFile: {
    display: "none",
  },
});

function getUserProfile(id, callBack) {
  fetch(HOST + "/" + id, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((user) => {
      callBack(null, user);
    })
    .catch((err) => callBack(err));
}

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      profileUser: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    getUserProfile(id, (err, user) => {
      if (err) this.props.history.push("/");
      else this.setState({ profileUser: user });
    });
  }

  uploadFile = (event, type) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(type, event.target.files[0]);
    fetch(HOST + "/" + type, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        enctype: "multipart/form-data",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(type);
        if (type !== "cover") this.props.getProfile();
        else {
          getUserProfile(this.props.user.id, (err, user) => {
            if (err) this.props.history.push("/");
            else this.setState({ profileUser: user });
          });
        }
      }
    });
  };

  uploadAvatar = (event) => {
    this.uploadFile(event, "avatar");
  };

  uploadCover = (event) => {
    this.uploadFile(event, "cover");
  };

  render() {
    const { user, classes } = this.props;
    const id = this.props.match.params.id;
    const { profileUser } = this.state;

    if (!profileUser) return <Box />;
    else {
      return (
        <Box width="100%">
          <Box
            className={classes.root}
            style={{
              backgroundImage:
                "url(" + HOST + "/image?id=" + profileUser.cover + ")",
            }}
            height={250}
            paddingTop={10}
          >
            <Box className={classes.blur} />
            {user.id === Number(id) ? (
              <Box className={classes.addCoverButton}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.uploadCover}
                  className={classes.addFile}
                  id="addCover"
                />
                <label htmlFor="addCover">
                  <IconButton
                    className={classes.addImageButton}
                    component="span"
                  >
                    <CameraIcon />
                  </IconButton>
                </label>
              </Box>
            ) : null}
            <Box width={160} margin="auto" className={classes.avatarContainer}>
              <Avatar
                className={classes.avatar}
                src={
                  profileUser.avatar ? HOST + "/image?id=" + profileUser.avatar : null
                }
              />
              <Box className={classes.addAvatarButton}>
                {user.id === Number(id) ? (
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={this.uploadAvatar}
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
                ) : (
                  <IconButton
                    className={classes.addImageButton}
                    component="span"
                  >
                    <PersonAddIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography className={classes.name} align="center">
              {profileUser.firstName + " " + profileUser.lastName}
            </Typography>
            <Tabs variant="fullWidth" value={0}>
              <Tab
                disableRipple
                className={classes.tab}
                label={<TimelineIcon />}
              />
              <Tab
                disableRipple
                className={classes.tab}
                label={<ImageIcon />}
              />
              <Tab
                disableRipple
                className={classes.tab}
                label={<FriendIcon />}
              />
              <Tab
                disableRipple
                className={classes.tab}
                label={<PersonIcon />}
              />
            </Tabs>
          </Box>
          <PostAdd />
          <Post />
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Profile));
