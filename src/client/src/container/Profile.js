import React from "react";
import { Space } from "antd";
import ProfileIntro from "../component/Profile/ProfileIntro";
import ProfileHome from "../component/Profile/ProfileHome";
import ProfileImages from "../component/Profile/ProfileImages";
import ProfileFriends from "../component/Profile/ProfileFriends";
import ProfileDetail from "../component/Profile/ProfileDetail";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { API_HOST } from "../config/constant";
import axios from "axios";
import Title from "../component/Common/Title";

function getUserProfile(id, callBack) {
  axios
    .get(`${API_HOST}/${id}`, { withCredentials: true })
    .then((res) => callBack(null, res.data))
    .catch((err) => callBack(err));
}

function Profile({ user, socket }) {
  const [profileUser, setProfileUser] = React.useState({});
  const params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    getUserProfile(params.id, (err, user) => {
      if (err) {
        history.push("/");
      } else setProfileUser(user);
    });
  }, [params.id, history]);

  const updateProfileUser = (data) => setProfileUser(data);

  if (!profileUser.firstName) return null;
  else {
    const url = `/${profileUser.id}`;
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title title={`${profileUser.firstName} ${profileUser.lastName}`} />
        <ProfileIntro updateProfileUser={updateProfileUser} user={user} profileUser={profileUser} socket={socket} />
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
      </Space>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    socket: state.socket,
  };
};

export default connect(mapStateToProps)(Profile);
