import React from "react";
import { Box } from "@material-ui/core";
import ProfileIntro from "../component/Profile/ProfileIntro";
import ProfileHome from "../component/Profile/ProfileHome";
import ProfileImages from "../component/Profile/ProfileImages";
import ProfileFriends from "../component/Profile/ProfileFriends";
import ProfileDetail from "../component/Profile/ProfileDetail";

import { Switch, Route } from "react-router-dom";
import { getProfile } from "../actions/getProfile";
import { connect } from "react-redux";
import { HOST } from "../config/constant";

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
    const { user } = this.props;
    const profileUser = Object.assign({}, this.state.profileUser, {
      id: this.props.match.params.id,
    });
    const url = `/${profileUser.id}`;

    if (!profileUser.firstName) return <Box />;
    else {
      return (
        <Box marginTop={2} width="100%">
          <ProfileIntro
            user={user}
            profileUser={profileUser}
            uploadAvatar={this.uploadAvatar}
            uploadCover={this.uploadCover}
          />
          <Switch>
            <Route exact path={`${url}/`}>
              <ProfileHome profileUser={profileUser} />
            </Route>
            <Route exact path={`${url}/images`}>
              <ProfileImages />
            </Route>
            <Route exact path={`${url}/friends`}>
              <ProfileFriends profileUser={profileUser} />
            </Route>
            <Route exact path={`${url}/detail`}>
              <ProfileDetail />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
