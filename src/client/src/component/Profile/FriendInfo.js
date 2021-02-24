import React from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import UserAvatar from "../Common/UserAvatar";
import FriendButton from "./FriendButton";

function FriendInfo(props) {
  const { friend, user, socket } = props;

  return (
    <List.Item
      style={{ paddingTop: 0, paddingBottom: 2 }}
      actions={[<FriendButton user={user} socket={socket} friend={friend} />]}
    >
      <List.Item.Meta
        avatar={
          <Link to={"/" + friend.id}>
            <UserAvatar imageId={friend.avatar} />
          </Link>
        }
        title={
          <Link style={{ marginBottom: 0 }} to={"/" + friend.id}>
            {friend.firstName + " " + friend.lastName}
          </Link>
        }
        description={`${friend.friendCount} friend${friend.friendCount === 1 ? "" : "s"}`}
      />
    </List.Item>
  );
}

export default FriendInfo;
