import React from "react";
import { Dropdown, Menu, Input, Badge, Button } from "antd";
import { HomeOutlined, TeamOutlined, MessageOutlined, NotificationOutlined, DownOutlined } from "@ant-design/icons";
import { API_HOST } from "../../config/constant";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../actions/signOut";
import DropDownMenu from "./DropDownMenu";
const { Search } = Input;

export function MainNavbar(props) {
  const { user } = props;
  const history = useHistory();

  if (!user) {
    history.push("/signin");
  }

  const signOut = () => {
    props.socket.disconnect();
    props.signOut();
  };

  return (
    <>
      {/* <img src="/assets/Logo.svg" alt="logo" style={{ height: "70%", margin: "auto 10px auto 0" }} /> */}
      <Search type="text" style={{ width: 250, height: 30, margin: "auto 0" }} placeholder="Search..." />
      <Menu style={{ marginLeft: "auto", marginRight: 20 }} theme="dark" mode="horizontal">
        <Menu.Item
          icon={
            <Badge count={2} overflowCount={99}>
              <HomeOutlined style={{ fontSize: 24, margin: "auto" }} />
            </Badge>
          }
        />
        <Menu.Item
          icon={
            <Badge count={0} overflowCount={99}>
              <TeamOutlined style={{ fontSize: 24, margin: "auto" }} />
            </Badge>
          }
        />
        <Menu.Item
          icon={
            <Badge count={2} overflowCount={99}>
              <MessageOutlined style={{ fontSize: 24, margin: "auto" }} />
            </Badge>
          }
        />
        <Menu.Item
          icon={
            <Badge count={2} overflowCount={99}>
              <NotificationOutlined style={{ fontSize: 24, margin: "auto" }} />
            </Badge>
          }
        />
      </Menu>
      <Dropdown overlay={DropDownMenu} placement="bottomRight">
        <Button>
          {`${user.lastName} ${user.firstName}`} <DownOutlined />
        </Button>
      </Dropdown>
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
