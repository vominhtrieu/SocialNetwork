import React from "react";
import { List } from "antd";
import FriendRequest from "../component/Friends/FriendRequest";
import { API_HOST } from "../config/constant";
import { connect } from "react-redux";
import Title from "../component/Common/Title";

function Friends({ socket }) {
  const [loading, setLoading] = React.useState(true);
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    fetch(API_HOST + "/friendrequests", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ requests }) => {
        setLoading(false);
        setRequests(requests);
      });
  }, []);

  React.useEffect(() => {
    socket.on("respondFriendRequest", (response) => {
      setRequests((requests) =>
        requests.filter((request) => {
          return request !== response.requestId;
        })
      );
    });

    socket.on("newFriendRequest", ({ requestId }) => {
      setRequests((requests) => [...requests, requestId]);
    });

    return () => {
      socket.off("respondFriendRequest");
    };
  }, [socket]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Title title="Friends" />
      <List
        style={{ width: "100%" }}
        header={<h3>Pending friend requests</h3>}
        loading={loading}
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(request) => <FriendRequest socket={socket} requestId={request} />}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(Friends);
