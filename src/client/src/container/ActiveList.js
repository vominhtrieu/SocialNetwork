import React from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserRow from "../component/ActiveList/UserRow";

function ActiveList({ socket }) {
  const [users, setUsers] = React.useState([]);

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

  return (
    <Menu style={{ height: "100%", background: "none" }}>
      <Menu.Item>
        <Link>Võ Minh Triều</Link>
      </Menu.Item>
    </Menu>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(ActiveList);
