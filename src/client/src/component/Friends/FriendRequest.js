import React from "react";
import { Link } from "react-router-dom";
import { API_HOST } from "../../config/constant";
import { List, Button, Skeleton } from "antd";
import UserAvatar from "../Common/UserAvatar";
import moment from "moment/moment";

function FriendRequest({ requestId, socket }) {
  const [request, setRequest] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_HOST}/friendrequest?id=${requestId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((requestData) => setRequest(requestData))
      .finally(() => setLoading(false));
  }, [requestId]);

  function respondRequest(response) {
    fetch(API_HOST + "/respondfriendrequest", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    }).then((res) => {
      if (res.ok) {
        socket.emit("respondFriendRequest", response);
      }
    });
  }

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => {
            respondRequest({ accept: true, requestId: request._id });
          }}
        >
          Accept
        </Button>,
        <Button
          onClick={() => {
            respondRequest({ accept: false, requestId: request._id });
          }}
        >
          Reject
        </Button>,
      ]}
    >
      <Skeleton loading={loading}>
        {!loading && (
          <List.Item.Meta
            avatar={
              <Link to={"/" + request.user._id}>
                <UserAvatar imageId={request.user.avatar} />
              </Link>
            }
            title={<Link to={"/" + request.user._id}>{request.user.firstName + " " + request.user.lastName}</Link>}
            description={moment(request.requestedDate).fromNow()}
          />
        )}
      </Skeleton>
    </List.Item>
  );
}

export default FriendRequest;
