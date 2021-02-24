import React from "react";
import { List, Space, Button, Divider } from "antd";
import { FormOutlined, TeamOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import UserItem from "../component/ActiveList/UserItem";
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
    <Space direction="vertical" style={{ width: "100%", overflowX: "hidden" }}>
      <NewPost visible={visible} closeModal={closeModal} user={user} />
      <Space style={{ padding: 10, paddingBottom: 0, display: "block" }}>
        <Button block icon={<FormOutlined />} type="primary" onClick={showModal}>
          Write a status
        </Button>
      </Space>

      <Divider style={{ margin: 5 }} />
      <Space style={{ padding: 10, paddingTop: 0, display: "block", overflowY: "auto" }}>
        <List
          // header={<h3 style={{ margin: 0 }}>Active</h3>}
          style={{ margin: 0 }}
          dataSource={users}
          locale={{
            emptyText: (
              <Space direction="vertical">
                <TeamOutlined style={{ fontSize: 48, color: "rgba(255,255,255,0.8)" }} />
                <h3>Your friends aren't online</h3>
              </Space>
            ),
          }}
          renderItem={(user) => <UserItem userId={user} />}
        />
      </Space>
    </Space>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
  user: state.user,
});

export default connect(mapStateToProps)(SiderBar);
