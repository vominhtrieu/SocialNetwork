import React from "react";
import { Dropdown, Menu, Badge, Button, Space, message } from "antd";
import { HomeOutlined, TeamOutlined, MessageOutlined, NotificationOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { signOut } from "../../actions/signOut";
import getMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";
import { API_HOST } from "../../config/constant";
import axios from "axios";

const routes = ["/", "/friends", "/messages", "/notifications"];

export function MainNavbar(props) {
  const { user } = props;

  const history = useHistory();
  const location = useLocation();

  if (!user) {
    history.push("/signin");
  }

  const [newFriendRequests, setNewFriendRequests] = React.useState(0);

  // List of rooms which  message(s) user have not read
  const [notSeenRooms, setNotSeenRooms] = React.useState(new Set());
  const [notifications, setNotifications] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`${API_HOST}/update`, { withCredentials: true })
      .then(({ data }) => {
        setNewFriendRequests(data.newFriendRequests);
        setNotSeenRooms(new Set(data.notSeenRooms));
        setNotifications(data.notifications);
      })
      .catch((err) => message.error(err.toString()));

    props.socket.on("friendRequestUpdate", (data) => {
      setNewFriendRequests(data.newFriendRequests);
    });

    props.socket.on("newMessage", ({ roomId }) => {
      setNotSeenRooms((notSeenRooms) => new Set(notSeenRooms).add(roomId));
    });

    props.socket.on("seen", ({ roomId }) => {
      setNotSeenRooms((notSeenRooms) => {
        let temp = new Set(notSeenRooms);
        temp.delete(Number(roomId));
        return temp;
      });
    });

    return () => {
      props.socket.off("friendRequestUpdate");
      props.socket.off("newMessage");
      props.socket.off("seen");
    };
  }, [props.socket]);

  const signOut = () => {
    props.socket.disconnect();
    props.signOut();
  };

  return (
    <>
      <SearchBar />
      <Space style={{ marginLeft: "auto" }}>
        <Menu style={{ marginRight: 5 }} theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key={routes[0]}>
            <Link to={routes[0]}>
              <Badge count={0}>
                <HomeOutlined style={{ fontSize: 24, marginRight: 0 }} />
              </Badge>
            </Link>
          </Menu.Item>
          <Menu.Item key={routes[1]}>
            <Link to={routes[1]}>
              <Badge count={newFriendRequests} overflowCount={99}>
                <TeamOutlined style={{ fontSize: 24, margin: "auto" }} />
              </Badge>
            </Link>
          </Menu.Item>

          <Menu.Item key={routes[2]}>
            <Link to={routes[2]}>
              <Badge count={notSeenRooms.size} overflowCount={99}>
                <MessageOutlined style={{ fontSize: 24, margin: "auto" }} />
              </Badge>
            </Link>
          </Menu.Item>

          <Menu.Item key={routes[3]}>
            <Link to={routes[3]}>
              <Badge count={notifications} overflowCount={99}>
                <NotificationOutlined style={{ fontSize: 24, margin: "auto" }} />
              </Badge>
            </Link>
          </Menu.Item>
        </Menu>
        <Dropdown overlay={getMenu(user, signOut)} placement="bottomRight">
          <Button>
            {`${user.firstName} ${user.lastName}`} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
