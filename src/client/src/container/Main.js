import React from "react";
import Friends from "../container/Friends";
import Messages from "../container/Messages";

import Home from "./Home";
import Notification from "./Notification";
import About from "../component/About/About";
import MainNavbar from "../component/Navbar/MainNavbar";
import LeftNavigation from "../component/Navbar/LeftNavigation";

import { Switch, Route } from "react-router-dom";
import { Row, Col, Layout } from "antd";
import PrivateRoute from "../component/Common/PrivateRoute";
import Profile from "./Profile";
import ActiveList from "./ActiveList";

import "./main.less";
const { Content, Header, Sider } = Layout;

function Main() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", padding: "0 200px" }}>
        <MainNavbar />
      </Header>
      <Layout style={{ height: "100%", padding: "0 200px" }}>
        <Content>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/friends" component={Friends} />
            <PrivateRoute path="/messages" component={Messages} />
            <PrivateRoute exact path="/notifications" component={Notification} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/:id" component={Profile} />
          </Switch>
        </Content>
        <Sider>
          <ActiveList />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Main;
