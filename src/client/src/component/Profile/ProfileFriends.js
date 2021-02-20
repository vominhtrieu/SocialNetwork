import React, { useEffect } from "react";
import FriendInfo from "./FriendInfo";
import { API_HOST } from "../../config/constant";
import { Modal, List } from "antd";

export default function ProfileFriends(props) {
  const { user, profileUser, visible, onClose, socket } = props;
  const [friends, setFriends] = React.useState([]);
  useEffect(() => {
    fetch(`${API_HOST}/${profileUser.id}/friends`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => {
            if (a.firstName > b.firstName) return -1;
            if (a.firstName < b.firstName) return 1;
            return 0;
          });
          setFriends(data);
        }
      });
  }, [profileUser.id]);

  return (
    <Modal title={`${profileUser.lastName}'s friend list`} visible={visible} footer={null} onCancel={onClose}>
      <List
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={(friend) => <FriendInfo friend={friend} user={user} socket={socket} />}
      ></List>
    </Modal>
  );
}
