import React from "react";
import Friends from "../container/Friends";
// import Messages from "../container/Messages";
import Home from "./Home";
import Notification from "./Notification";
import About from "../component/About/About";
import MainNavbar from "../component/Navbar/MainNavbar";

import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import PrivateRoute from "../component/Common/PrivateRoute";
import Profile from "./Profile";
import SiderBar from "./SiderBar";

import "./main.less";
const { Content, Header, Sider } = Layout;

function Main() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ width: "100%", position: "fixed", zIndex: 999 }} className="nav-bar">
        <MainNavbar />
      </Header>
      <Layout className="main-body">
        <Content className="main-content">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/friends" component={Friends} />
            {/* <PrivateRoute path="/messages" component={Messages} /> */}
            <PrivateRoute exact path="/notifications" component={Notification} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/:id" component={Profile} />
          </Switch>
        </Content>
        <Sider id="main-sider" width={300} reverseArrow breakpoint="lg" collapsedWidth={0}>
          <SiderBar />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Main;
