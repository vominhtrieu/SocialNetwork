import React from "react";
import { Button, message } from "antd";
import { MinusOutlined, PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_HOST } from "../../config/constant";

export default function FriendButton({ user, friend, socket, style }) {
  const [status, setStatus] = React.useState(friend.status);

  React.useEffect(() => {
    setStatus(friend.status);
  }, [friend.status]);

  const unfriend = () => {
    setStatus(false);
    axios
      .post(API_HOST + "/unfriend", { friendId: friend.id }, { withCredentials: true })
      .then((res) => {
        message.error(`You and ${friend.lastName} are not friends anymore!`);
      })
      .catch((_err) => {
        message.error("Error occurs, please try again!");
        setStatus(true);
      });
  };

  const addFriend = () => {
    const temp = status;
    setStatus("Pending");
    axios
      .post(API_HOST + "/addfriend", { addId: friend.id }, { withCredentials: true })
      .then((res) => {
        socket.emit("sendFriendRequest", { friendId: friend.id });
      })
      .catch((e) => {
        console.log(e.response.data);
        message.error("Error occurs, please try again!" + e);
        setStatus(temp);
      });
  };

  const accept = () => {
    const temp = status;
    setStatus("Friend");
    axios
      .post(
        `${API_HOST}/respondfriendrequest`,
        { accept: true, requestId: friend.request._id },
        { withCredentials: true }
      )
      .then((res) => {
        message.success(`You and ${friend.lastName} are friends now`);
      })
      .catch((err) => {
        setStatus(temp);
        message.error(`Error occurs. Please try again!`);
      });
  };

  const cancel = () => {
    const temp = status;
    setStatus("Nothing");
    axios
      .post(
        `${API_HOST}/cancelrequest`,
        { requestId: friend.request._id, userId: friend.id },
        { withCredentials: true }
      )
      .then((res) => {
        message.success(`You cancelled your friend request`);
      })
      .catch((err) => {
        setStatus(temp);
        message.error(`Error occurs. Please try again!`);
      });
  };

  if (user.id === friend.id) {
    return null;
  }

  if (status === "Friend") {
    return (
      <Button icon={<MinusOutlined />} style={style} onClick={unfriend}>
        Unfriend
      </Button>
    );
  } else if (status === "Pending") {
    return (
      <Button onClick={cancel} icon={<CloseOutlined />} style={style}>
        Cancel request
      </Button>
    );
  } else if (status === "Wait") {
    return (
      <Button onClick={accept} icon={<CheckOutlined />} type="primary" style={style}>
        Accept request
      </Button>
    );
  }
  return (
    <Button type="primary" icon={<PlusOutlined />} style={style} onClick={addFriend}>
      Add friend
    </Button>
  );
}
