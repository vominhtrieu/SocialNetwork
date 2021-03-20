import { List, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React from "react";
import { API_HOST } from "../../config/constant";
import SuggestedUser from "./SuggestedUser";

function NewMessageModal({ visible, user, onClose }) {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [friendList, setFriendList] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_HOST}/${user.id}/friends`, { withCredentials: true })
      .then(({ data }) => {
        setFriendList(data);
      })
      .catch((err) => message.error("Cannot fetch your friend list"));
  }, [user.id]);

  console.log(selectedUsers);

  const selectUser = (id) => {
    if (selectedUsers.find((user) => user === id)) return;
    setSelectedUsers((selectedUsers) => [...selectedUsers, id]);
  };

  const deselectUser = (id) => {
    setSelectedUsers((selectedUsers) => selectedUsers.filter((user) => user !== id));
  };

  const submit = () => {
    axios
      .post(`${API_HOST}/room/new`, { participants: selectedUsers }, { withCredentials: true })
      .then(() => {
        message.success("Successfully created new group chat");
        onClose();
      })
      .catch((err) => message.error(err.message));
  };

  if (friendList === null) return null;
  return (
    <Modal
      title="Create group chat"
      visible={visible}
      okText="Create"
      okButtonProps={{ disabled: selectedUsers.length < 2 }}
      onOk={submit}
      onCancel={onClose}
    >
      <List
        dataSource={friendList}
        renderItem={(item) => (
          <SuggestedUser
            friend={item}
            onSelected={(id) => {
              selectUser(id);
            }}
            onDeselected={(id) => {
              deselectUser(id);
            }}
          />
        )}
      />
    </Modal>
  );
}

export default NewMessageModal;
