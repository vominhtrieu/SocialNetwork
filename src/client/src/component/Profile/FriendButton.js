import React from "react";
import { Button, message } from "antd";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_HOST } from "../../config/constant";

export default function FriendButton({ user, friend, socket, style }) {
  const [status, setStatus] = React.useState(friend.status);
  console.log(friend);

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
        message.error("Error occurs, please try again!" + e);
        setStatus(temp);
      });
  };

  console.log(status);
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
      <Button icon={<CloseOutlined />} style={style}>
        Cancel request
      </Button>
    );
  } else if (status === "Wait") {
    return <Button style={style}>Accept request</Button>;
  }
  return (
    <Button type="primary" icon={<PlusOutlined />} style={style} onClick={addFriend}>
      Add friend
    </Button>
  );
}
