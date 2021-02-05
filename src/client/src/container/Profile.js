import React from "react";
import { Box } from "@material-ui/core";
import ProfileIntro from "../component/Profile/ProfileIntro";
import ProfileHome from "../component/Profile/ProfileHome";
import ProfileImages from "../component/Profile/ProfileImages";
import ProfileFriends from "../component/Profile/ProfileFriends";
import ProfileDetail from "../component/Profile/ProfileDetail";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { API_HOST } from "../config/constant";
import { axios } from "axios";

function getUserProfile(id, callBack) {
  axios
    .get(`${API_HOST}/id`)
    .then((res) => callBack(null, res.data))
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

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;

    if (prevProps.match.params.id === id) return;
    getUserProfile(id, (err, user) => {
      if (err) {
        this.props.history.push("/");
      } else this.setState({ profileUser: user });
    });
  }

  uploadFile = (event, type) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(type, event.target.files[0]);
    fetch(API_HOST + "/" + type, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        enctype: "multipart/form-data",
      },
    }).then((res) => {
      if (res.ok) {
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
    const { user } = this.props;
    const profileUser = Object.assign({}, this.state.profileUser, {
      id: this.props.match.params.id,
    });
    const url = `/${profileUser.id}`;

    if (!profileUser.firstName) return <Box />;
    else {
      return (
        <Box marginTop={2} width="100%">
          <Helmet>
            <title>{"MTNET - " + profileUser.firstName + " " + profileUser.lastName}</title>
          </Helmet>
          <ProfileIntro
            user={user}
            profileUser={profileUser}
            uploadAvatar={this.uploadAvatar}
            uploadCover={this.uploadCover}
            socket={this.props.socket}
          />
          <Switch>
            <Route exact path={`${url}/`}>
              <ProfileHome profileUser={profileUser} />
            </Route>
            <Route exact path={`${url}/images`}>
              <ProfileImages />
            </Route>
            <Route exact path={`${url}/friends`}>
              <ProfileFriends user={user} profileUser={profileUser} />
            </Route>
            <Route exact path={`${url}/detail`}>
              <ProfileDetail profileUser={profileUser} />
            </Route>
          </Switch>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    socket: state.socket,
  };
};

export default connect(mapStateToProps)(Profile);
