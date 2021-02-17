import React from "react";
import { Menu, Space, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewPost from "../component/Post/NewPost";

function SiderBar({ socket, user }) {
  const [users, setUsers] = React.useState([]);
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

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <NewPost visible={visible} closeModal={closeModal} user={user} />
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

export default connect(mapStateToProps)(SiderBar);
