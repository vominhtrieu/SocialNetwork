import React from "react";
import { Menu, Space, Modal, message, Input, Button } from "antd";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import { API_HOST } from "../config/constant";

const { TextArea } = Input;

function ActiveList({ socket, user }) {
  const [users, setUsers] = React.useState([]);
  const [text, setText] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    socket.on("onlineList", (userList) => {
      setUsers(userList);
    });

    socket.on("online", (friendId) => {
      setUsers((users) => {
        if (!users.includes(friendId)) return [...users, friendId];
        else return users;
      });
    });

    socket.on("offline", (friendId) => {
      setUsers((users) => users.filter((user) => user !== friendId));
    });
  }, [socket]);

  const showModal = () => {
    setVisible(true);
  };

  const addPost = () => {
    axios
      .post(
        `${API_HOST}/posts`,
        {
          post: {
            textContent: text,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        message.success("Successfully posted your status");
        closeModal();
      })
      .catch((_err) => message.error("Error occurs, please try again!"));
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Modal
        title="Add New Post"
        visible={visible}
        okButtonProps={{ disabled: text === "" }}
        okText="Post"
        onOk={addPost}
        onCancel={closeModal}
      >
        <Space style={{ marginBottom: 10 }}>
          <Avatar src={`${API_HOST}/images/${user.avatar}`} icon={<UserOutlined />} />
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
        </Space>
        <TextArea
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ resize: "none", height: 100 }}
          value={text}
          placeholder="Write something..."
        />
      </Modal>

      <Space style={{ padding: 10, display: "block" }}>
        <Button block icon={<FormOutlined />} type="primary" onClick={showModal}>
          Write a status
        </Button>
      </Space>
      {users.length === 0 ? (
        <h3 style={{ padding: "0 10px", whiteSpace: "nowrap" }}>You don't have any friend online</h3>
      ) : (
        <Menu style={{ minHeight: "100%", background: "none" }}>
          {users.forEach((user) => {
            <Menu.Item>
              <Link to={`/${user._id}`}>Võ Minh Triều</Link>
            </Menu.Item>;
          })}
        </Menu>
      )}
    </Space>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
  user: state.user,
});

export default connect(mapStateToProps)(ActiveList);
