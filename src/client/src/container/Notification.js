import { List, message } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Title from "../component/Common/Title";
import UserAvatar from "../component/Common/UserAvatar";
import { API_HOST } from "../config/constant";
import moment from "moment";
import { Link } from "react-router-dom";

function Notification({ socket, user }) {
  const [notifications, setNotifications] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_HOST}/notifications`)
      .then(({ data }) => setNotifications(data))
      .catch((err) => {
        message.error(err.toString());
      });

    socket.emit("subscribeToNotifications");
    return () => {
      socket.emit("unSubscribeToNotifications");
    };
  }, [socket]);

  console.log(notifications);
  return (
    <>
      <Title title="Notification" />
      <List
        dataSource={notifications === null ? [] : notifications}
        loading={notifications === null}
        renderItem={(notification) => (
          <Link to={notification.link}>
            <List.Item>
              <List.Item.Meta
                avatar={<UserAvatar imageId={notification.user.avatar} />}
                title={<span dangerouslySetInnerHTML={{ __html: notification.html }} />}
                description={moment(notification.date).fromNow()}
              />
            </List.Item>
          </Link>
        )}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
  user: state.user,
});

export default connect(mapStateToProps)(Notification);
