import React from "react";

import { connect } from "react-redux";
import { Avatar, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

function LeftNavigation({ user }) {
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <Menu theme="light">
          <Menu.Item>
            <Avatar icon={<UserOutlined />} />
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Friends</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Messages</Link>
          </Menu.Item>
        </Menu>
      </Content>
      <Footer>
        <b>© 2021 Võ Minh Triều</b>
      </Footer>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LeftNavigation);
